import { v, type Infer } from 'convex/values';
import { action, internalMutation, mutation, type MutationCtx } from './_generated/server';
import { embedMany } from 'ai';
import { embeddingModel } from './openai';
import { internal } from './_generated/api';
import { assertAdmin } from './auth';
import { kind } from './schema';
import type { Id } from './_generated/dataModel';

const sourceItem = v.object({
	sourceId: v.string(),
	kind,
	title: v.string(),
	searchText: v.string(),
	body: v.string(),
	url: v.string(),
	imageUrl: v.optional(v.string()),
	thumbnailUrl: v.optional(v.string()),
	tags: v.array(v.string()),
	location: v.optional(v.string()),
	category: v.optional(v.string()),
	publishedAt: v.optional(v.number())
});

type SourceItem = Infer<typeof sourceItem>;

async function writeSources(ctx: MutationCtx, items: SourceItem[]) {
	const ids: Id<'documents'>[] = [];
	for (const item of items) {
		const existing = await ctx.db
			.query('documents')
			.withIndex('by_sourceId', (q) => q.eq('sourceId', item.sourceId))
			.unique();
		if (existing) {
			await ctx.db.patch(existing._id, item);
			ids.push(existing._id);
		} else {
			ids.push(await ctx.db.insert('documents', item));
		}
	}
	return ids;
}

export const upsertSources = internalMutation({
	args: { items: v.array(sourceItem) },
	handler: async (ctx, args) => {
		return await writeSources(ctx, args.items);
	}
});

export const upsertDocuments = mutation({
	args: { adminKey: v.string(), items: v.array(sourceItem) },
	returns: v.object({ upserted: v.number() }),
	handler: async (ctx, args) => {
		assertAdmin(args.adminKey);
		const ids = await writeSources(ctx, args.items);
		return { upserted: ids.length };
	}
});

export const upsertPhotoMeta = mutation({
	args: {
		adminKey: v.string(),
		rows: v.array(
			v.object({
				sourceId: v.string(),
				tags: v.array(v.string()),
				extraDescription: v.optional(v.string())
			})
		)
	},
	returns: v.null(),
	handler: async (ctx, args) => {
		assertAdmin(args.adminKey);
		for (const row of args.rows) {
			const existing = await ctx.db
				.query('photoMeta')
				.withIndex('by_sourceId', (q) => q.eq('sourceId', row.sourceId))
				.unique();
			if (existing) await ctx.db.patch(existing._id, row);
			else await ctx.db.insert('photoMeta', row);
		}
		return null;
	}
});

export const listPhotoMeta = mutation({
	args: { adminKey: v.string() },
	handler: async (ctx, args) => {
		assertAdmin(args.adminKey);
		return await ctx.db.query('photoMeta').collect();
	}
});

export const embedDocuments = internalMutation({
	args: {
		rows: v.array(
			v.object({
				documentId: v.id('documents'),
				kind,
				vector: v.array(v.float64())
			})
		)
	},
	handler: async (ctx, args) => {
		for (const row of args.rows) {
			const existing = await ctx.db
				.query('embeddings')
				.withIndex('by_document', (q) => q.eq('documentId', row.documentId))
				.unique();
			if (existing) await ctx.db.patch(existing._id, { vector: row.vector, kind: row.kind });
			else await ctx.db.insert('embeddings', row);
		}
	}
});

export const sync = action({
	args: { adminKey: v.string(), items: v.array(sourceItem) },
	handler: async (ctx, args) => {
		assertAdmin(args.adminKey);
		const ids = await ctx.runMutation(internal.ingest.upsertSources, { items: args.items });
		const texts = args.items.map((item) => item.searchText.slice(0, 8000));
		const { embeddings } = await embedMany({
			model: embeddingModel,
			values: texts
		});
		await ctx.runMutation(internal.ingest.embedDocuments, {
			rows: ids.map((documentId, i) => ({
				documentId,
				kind: args.items[i].kind,
				vector: embeddings[i]
			}))
		});
		return { upserted: ids.length };
	}
});
