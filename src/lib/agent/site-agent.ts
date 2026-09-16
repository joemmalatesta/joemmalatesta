import { env } from '$env/dynamic/private';
import { ToolLoopAgent, tool, stepCountIs } from 'ai';
import { z } from 'zod';
import { ConvexHttpClient } from 'convex/browser';
import { PUBLIC_CONVEX_URL } from '$env/static/public';
import { api } from '../../convex/_generated/api';
import { chatModel } from '$lib/ai/models';
import { joeVoice } from './voice';

if (env.OPENAI_API_KEY) {
	process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;
}

function convex() {
	return new ConvexHttpClient(PUBLIC_CONVEX_URL);
}

export const siteAgent = new ToolLoopAgent({
	model: chatModel,
	instructions: joeVoice,
	stopWhen: stepCountIs(4),
	tools: {
		searchSite: tool({
			description:
				"Search Joe's writing, projects, photos, bookmarks, updates, or Q&A. Only call when the visitor asked about those. Never call for jokes, greetings, code, homework, or off-topic chat.",
			inputSchema: z.object({
				query: z.string(),
				kind: z.enum(['writing', 'project', 'bookmark', 'photo', 'update', 'qa']).optional()
			}),
			execute: async ({ query, kind }) => {
				return convex().query(api.search.fullText, { query, kind, limit: 16 });
			}
		}),
		searchPhotos: tool({
			description:
				"Find Joe's film photos by place, subject, or vibe. Only call for photo questions. Never call for jokes or off-topic chat.",
			inputSchema: z.object({ query: z.string() }),
			execute: async ({ query }) => {
				const [keyword, semantic] = await Promise.all([
					convex().query(api.search.fullText, { query, kind: 'photo', limit: 16 }),
					convex()
						.action(api.search.semantic, { query, kind: 'photo', limit: 12 })
						.catch(() => [])
				]);
				const hits = [...keyword, ...semantic] as {
					location?: string;
					category?: string;
					title?: string;
				}[];
				const places = [...new Set(hits.map((hit) => hit.location).filter(Boolean))];
				const rolls = [...new Set(hits.map((hit) => hit.category).filter(Boolean))];
				return { places, rolls, keyword, semantic };
			}
		}),
		getDocument: tool({
			description:
				'Load the full searchable chunk for a sourceId already returned by search. Only after a real site search.',
			inputSchema: z.object({ sourceId: z.string() }),
			execute: async ({ sourceId }) => {
				return convex().query(api.search.getBySourceId, { sourceId });
			}
		})
	}
});
