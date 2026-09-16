import { v } from 'convex/values';
import { action, internalQuery, query } from './_generated/server';
import { embed } from 'ai';
import { embeddingModel } from './openai';
import { internal } from './_generated/api';
import { kind } from './schema';
import type { Doc } from './_generated/dataModel';

const resultFields = (doc: Doc<'documents'>, score?: number) => ({
	id: doc._id,
	sourceId: doc.sourceId,
	kind: doc.kind,
	title: doc.title,
	body: doc.body,
	url: doc.url,
	imageUrl: doc.imageUrl,
	thumbnailUrl: doc.thumbnailUrl,
	tags: doc.tags,
	location: doc.location,
	category: doc.category,
	score
});

export const fullText = query({
	args: {
		query: v.string(),
		kind: v.optional(kind),
		limit: v.optional(v.number())
	},
	handler: async (ctx, args) => {
		const q = args.query.trim();
		if (q.length < 2) return [];
		const limit = Math.min(args.limit ?? 20, 32);
		const rows = await ctx.db
			.query('documents')
			.withSearchIndex('search_text', (s) => {
				const built = s.search('searchText', q);
				return args.kind ? built.eq('kind', args.kind) : built;
			})
			.take(32);
		const promoted = [
			...rows.filter((doc) => doc.sourceId.startsWith('film:roll:')),
			...rows.filter((doc) => !doc.sourceId.startsWith('film:roll:'))
		].slice(0, limit);
		return promoted.map((doc) => resultFields(doc));
	}
});

export const getBySourceId = query({
	args: { sourceId: v.string() },
	handler: async (ctx, args) => {
		const doc = await ctx.db
			.query('documents')
			.withIndex('by_sourceId', (q) => q.eq('sourceId', args.sourceId))
			.unique();
		return doc ? resultFields(doc) : null;
	}
});

export const fetchByEmbeddingIds = internalQuery({
	args: { ids: v.array(v.id('embeddings')) },
	handler: async (ctx, args) => {
		const out = [];
		for (const id of args.ids) {
			const embedding = await ctx.db.get(id);
			if (!embedding) continue;
			const doc = await ctx.db.get(embedding.documentId);
			if (doc) out.push({ embeddingId: id, doc: resultFields(doc) });
		}
		return out;
	}
});

export const semantic = action({
	args: {
		query: v.string(),
		kind: v.optional(kind),
		limit: v.optional(v.number())
	},
	handler: async (ctx, args) => {
		const q = args.query.trim();
		if (q.length < 2) return [];
		const { embedding } = await embed({
			model: embeddingModel,
			value: q
		});
		const hits = await ctx.vectorSearch('embeddings', 'by_vector', {
			vector: embedding,
			limit: 16,
			filter: args.kind ? (f) => f.eq('kind', args.kind) : undefined
		});
		const rows = await ctx.runQuery(internal.search.fetchByEmbeddingIds, {
			ids: hits.map((h) => h._id)
		});
		const scoreById = new Map(hits.map((h) => [h._id, h._score]));
		const ranked = rows
			.map((row) => ({
				...row.doc,
				score: scoreById.get(row.embeddingId) ?? 0
			}))
			.sort((a, b) => b.score - a.score);
		const top = ranked[0]?.score ?? 0;
		const floor = Math.max(0.32, top * 0.75);
		return ranked.filter((row) => row.score >= floor).slice(0, Math.min(args.limit ?? 8, 12));
	}
});
