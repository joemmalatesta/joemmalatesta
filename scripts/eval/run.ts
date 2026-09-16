import { writeFileSync } from 'node:fs';
import { ToolLoopAgent, tool, stepCountIs } from 'ai';
import { z } from 'zod';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../src/convex/_generated/api';
import { collapsePageHits, mergeHits } from '../../src/lib/search/merge';
import type { SearchHit } from '../../src/lib/search/types';
import { chatModel } from '../../src/lib/ai/models';
import { joeVoice } from '../../src/lib/agent/voice';
import { siteScopeRefusal } from '../../src/lib/agent/guardrails';
import { cases, type EvalCase } from './cases';

const CONVEX_URL = process.env.PUBLIC_CONVEX_URL;
if (!CONVEX_URL) throw new Error('Missing PUBLIC_CONVEX_URL');
if (!process.env.OPENAI_API_KEY) throw new Error('Missing OPENAI_API_KEY');

const convex = new ConvexHttpClient(CONVEX_URL);
const OUT = new URL('./results.csv', import.meta.url);

const agent = new ToolLoopAgent({
	model: chatModel,
	instructions: joeVoice,
	stopWhen: stepCountIs(4),
	tools: {
		searchSite: tool({
			description:
				"Search Joe's writing, projects, photos, bookmarks, updates, or Q&A. Only call when the visitor asked about those.",
			inputSchema: z.object({
				query: z.string(),
				kind: z.enum(['writing', 'project', 'bookmark', 'photo', 'update', 'qa']).optional()
			}),
			execute: async ({ query, kind }) => {
				return convex.query(api.search.fullText, { query, kind, limit: 16 });
			}
		}),
		searchPhotos: tool({
			description: "Find Joe's film photos by place, subject, or vibe.",
			inputSchema: z.object({ query: z.string() }),
			execute: async ({ query }) => {
				const [keyword, semantic] = await Promise.all([
					convex.query(api.search.fullText, { query, kind: 'photo', limit: 16 }),
					convex.action(api.search.semantic, { query, kind: 'photo', limit: 12 }).catch(() => [])
				]);
				const hits = [...keyword, ...semantic] as SearchHit[];
				const places = [...new Set(hits.map((hit) => hit.location).filter(Boolean))];
				const rolls = [...new Set(hits.map((hit) => hit.category).filter(Boolean))];
				return { places, rolls, keyword, semantic };
			}
		}),
		getDocument: tool({
			description: 'Load a searchable chunk by sourceId.',
			inputSchema: z.object({ sourceId: z.string() }),
			execute: async ({ sourceId }) => convex.query(api.search.getBySourceId, { sourceId })
		})
	}
});

function csvCell(value: string): string {
	if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
	return value;
}

function compact(text: string, max = 280): string {
	const one = text.replace(/\s+/g, ' ').trim();
	return one.length <= max ? one : `${one.slice(0, max - 1)}…`;
}

async function lookup(query: string): Promise<{ count: number; top: string; blob: string }> {
	const q = query.trim();
	if (q.length < 2) return { count: 0, top: '(skipped, <2 chars)', blob: '' };
	const keyword = collapsePageHits(
		(await convex.query(api.search.fullText, { query: q, limit: 16 })) as SearchHit[]
	);
	let hits = keyword;
	if (q.length >= 3) {
		try {
			const extra = (await convex.action(api.search.semantic, {
				query: q,
				limit: 8
			})) as SearchHit[];
			hits = mergeHits(keyword, extra);
		} catch {
			// keyword only
		}
	}
	const top = hits
		.slice(0, 5)
		.map((hit) => `${hit.kind}:${hit.title}`)
		.join(' | ');
	const blob = hits
		.slice(0, 8)
		.map((hit) => `${hit.title} ${hit.body} ${hit.location ?? ''} ${hit.category ?? ''}`)
		.join(' ');
	return { count: hits.length, top, blob };
}

async function chat(text: string): Promise<{ reply: string; tools: string; refused: boolean }> {
	const wall = siteScopeRefusal(text);
	if (wall) return { reply: wall, tools: 'prefilter', refused: true };
	try {
		const result = await agent.generate({
			prompt: text
		});
		const tools = [
			...new Set(
				result.steps.flatMap((step) =>
					step.toolCalls.map((call) => ('toolName' in call ? String(call.toolName) : ''))
				)
			)
		]
			.filter(Boolean)
			.join('+');
		const reply = result.text ?? '';
		const refused =
			/not going to write your code|still joe, still this site|that's not a question|not a question|i only talk about this site/i.test(
				reply
			);
		return { reply, tools, refused };
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		return { reply: `ERROR ${compact(message, 160)}`, tools: '', refused: false };
	}
}

function flags(
	c: EvalCase,
	look: { count: number; top: string; blob: string },
	agent: { reply: string; tools: string; refused: boolean }
): string {
	const out: string[] = [];
	if (c.lookup !== false && c.question.trim().length >= 2) {
		if (look.count === 0) out.push('LOOKUP_EMPTY');
		if (c.expectLookup && look.count > 0 && !c.expectLookup.test(`${look.top} ${look.blob}`)) {
			out.push('LOOKUP_MISS');
		}
	}
	if (c.chat !== false) {
		if (!agent.reply) out.push('AGENT_EMPTY');
		if (/^ERROR |HTTP \d/.test(agent.reply)) out.push('AGENT_ERROR');
		if (/function |export default|```/.test(agent.reply)) out.push('AGENT_CODE');
		if (c.shouldRefuse && !agent.refused) out.push('SHOULD_REFUSE');
		if (!c.shouldRefuse && agent.refused) out.push('OVER_REFUSED');
		if (c.expectChat) {
			const missing = c.expectChat.filter((re) => !re.test(agent.reply));
			if (missing.length) out.push(`CHAT_MISS:${missing.map((re) => re.source).join(',')}`);
		}
	}
	return out.join(' ');
}

const header = [
	'id',
	'category',
	'question',
	'lookup_count',
	'lookup_top',
	'agent_tools',
	'agent_reply',
	'flags'
];

async function main() {
	const rows = [header.map(csvCell).join(',')];
	writeFileSync(OUT, `${rows.join('\n')}\n`);

	for (const [i, c] of cases.entries()) {
		process.stdout.write(`[${i + 1}/${cases.length}] ${c.id} … `);
		const look = c.lookup === false ? { count: 0, top: '', blob: '' } : await lookup(c.question);
		const agentOut =
			c.chat === false ? { reply: '', tools: '', refused: false } : await chat(c.question);
		const mark = flags(c, look, agentOut);
		rows.push(
			[
				c.id,
				c.category,
				c.question,
				c.lookup === false ? '' : String(look.count),
				c.lookup === false ? '' : look.top,
				agentOut.tools,
				compact(agentOut.reply, 400),
				mark
			]
				.map(csvCell)
				.join(',')
		);
		writeFileSync(OUT, `${rows.join('\n')}\n`);
		console.log(mark || 'ok');
	}

	console.log(`wrote ${OUT.pathname}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
