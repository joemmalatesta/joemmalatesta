import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { assertAdmin } from './auth';
import type { Id } from './_generated/dataModel';

function toClient(doc: {
	_id: Id<'questions'>;
	question: string;
	answer?: string;
	likes: number;
	status: 'open' | 'answered' | 'deleted';
	dateAsked: number;
	dateAnswered?: number;
}) {
	return {
		id: doc._id,
		question: doc.question,
		answer: doc.answer ?? '',
		likes: doc.likes,
		deleted: doc.status === 'deleted',
		dateAsked: doc.dateAsked,
		dateAnswered: doc.dateAnswered
	};
}

async function upsertQaDocument(
	ctx: { db: any },
	questionId: Id<'questions'>,
	question: string,
	answer: string,
	dateAnswered: number
) {
	const sourceId = `qa:${questionId}`;
	const existing = await ctx.db
		.query('documents')
		.withIndex('by_sourceId', (q: any) => q.eq('sourceId', sourceId))
		.unique();

	const fields = {
		sourceId,
		kind: 'qa' as const,
		title: question,
		searchText: `${question} ${answer}`,
		body: answer,
		url: '/QnA',
		tags: ['q&a', 'qa'],
		publishedAt: dateAnswered
	};

	if (existing) {
		await ctx.db.patch(existing._id, fields);
		return existing._id as Id<'documents'>;
	}
	return await ctx.db.insert('documents', fields);
}

export const listAnswered = query({
	args: {},
	handler: async (ctx) => {
		const rows = await ctx.db
			.query('questions')
			.withIndex('by_status', (q) => q.eq('status', 'answered'))
			.order('desc')
			.collect();
		return rows.map(toClient);
	}
});

export const listAdmin = query({
	args: { adminKey: v.string() },
	handler: async (ctx, args) => {
		assertAdmin(args.adminKey);
		const all = await ctx.db.query('questions').withIndex('by_dateAsked').order('desc').collect();
		return {
			unansweredQuestions: all.filter((q) => q.status === 'open').map(toClient),
			answeredQuestions: all
				.filter((q) => q.status === 'answered')
				.sort((a, b) => (b.dateAnswered ?? 0) - (a.dateAnswered ?? 0))
				.map(toClient),
			deletedQuestions: all.filter((q) => q.status === 'deleted').map(toClient)
		};
	}
});

export const ask = mutation({
	args: { question: v.string() },
	handler: async (ctx, args) => {
		const question = args.question.trim();
		if (!question) throw new Error('Question is required');
		await ctx.db.insert('questions', {
			question,
			likes: 0,
			status: 'open',
			dateAsked: Date.now()
		});
	}
});

export const like = mutation({
	args: { id: v.id('questions'), delta: v.number() },
	handler: async (ctx, args) => {
		const row = await ctx.db.get(args.id);
		if (!row) throw new Error('Question not found');
		await ctx.db.patch(args.id, { likes: Math.max(0, row.likes + args.delta) });
	}
});

export const answer = mutation({
	args: { adminKey: v.string(), id: v.id('questions'), answer: v.string() },
	handler: async (ctx, args) => {
		assertAdmin(args.adminKey);
		const answer = args.answer.trim();
		if (!answer) throw new Error('Answer is required');
		const row = await ctx.db.get(args.id);
		if (!row) throw new Error('Question not found');
		const dateAnswered = Date.now();
		const documentId = await upsertQaDocument(ctx, args.id, row.question, answer, dateAnswered);
		await ctx.db.patch(args.id, {
			answer,
			status: 'answered',
			dateAnswered,
			documentId
		});
	}
});

export const setStatus = mutation({
	args: {
		adminKey: v.string(),
		id: v.id('questions'),
		status: v.union(v.literal('open'), v.literal('answered'), v.literal('deleted'))
	},
	handler: async (ctx, args) => {
		assertAdmin(args.adminKey);
		const row = await ctx.db.get(args.id);
		if (!row) throw new Error('Question not found');
		await ctx.db.patch(args.id, { status: args.status });
	}
});

export const clearAnswer = mutation({
	args: { adminKey: v.string(), id: v.id('questions') },
	handler: async (ctx, args) => {
		assertAdmin(args.adminKey);
		const row = await ctx.db.get(args.id);
		if (!row) throw new Error('Question not found');
		if (row.documentId) {
			const embedding = await ctx.db
				.query('embeddings')
				.withIndex('by_document', (q) => q.eq('documentId', row.documentId!))
				.unique();
			if (embedding) await ctx.db.delete(embedding._id);
			await ctx.db.delete(row.documentId);
		}
		await ctx.db.patch(args.id, {
			answer: undefined,
			dateAnswered: undefined,
			documentId: undefined,
			likes: 0,
			status: 'open'
		});
	}
});

export const remove = mutation({
	args: { adminKey: v.string(), id: v.id('questions') },
	handler: async (ctx, args) => {
		assertAdmin(args.adminKey);
		const row = await ctx.db.get(args.id);
		if (!row) return;
		if (row.documentId) {
			const embedding = await ctx.db
				.query('embeddings')
				.withIndex('by_document', (q) => q.eq('documentId', row.documentId!))
				.unique();
			if (embedding) await ctx.db.delete(embedding._id);
			await ctx.db.delete(row.documentId);
		}
		await ctx.db.delete(args.id);
	}
});

export const importMany = mutation({
	args: {
		adminKey: v.string(),
		rows: v.array(
			v.object({
				question: v.string(),
				answer: v.optional(v.string()),
				likes: v.number(),
				status: v.union(v.literal('open'), v.literal('answered'), v.literal('deleted')),
				dateAsked: v.number(),
				dateAnswered: v.optional(v.number())
			})
		)
	},
	handler: async (ctx, args) => {
		assertAdmin(args.adminKey);
		let imported = 0;
		for (const row of args.rows) {
			const id = await ctx.db.insert('questions', row);
			if (row.status === 'answered' && row.answer && row.dateAnswered) {
				const documentId = await upsertQaDocument(
					ctx,
					id,
					row.question,
					row.answer,
					row.dateAnswered
				);
				await ctx.db.patch(id, { documentId });
			}
			imported += 1;
		}
		return { imported };
	}
});
