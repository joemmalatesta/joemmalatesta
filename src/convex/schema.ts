import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const kind = v.union(
	v.literal('writing'),
	v.literal('project'),
	v.literal('bookmark'),
	v.literal('photo'),
	v.literal('update'),
	v.literal('qa'),
	v.literal('page')
);

export default defineSchema({
	documents: defineTable({
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
	})
		.index('by_sourceId', ['sourceId'])
		.index('by_kind', ['kind'])
		.searchIndex('search_text', {
			searchField: 'searchText',
			filterFields: ['kind']
		}),

	embeddings: defineTable({
		documentId: v.id('documents'),
		kind,
		vector: v.array(v.float64())
	})
		.index('by_document', ['documentId'])
		.vectorIndex('by_vector', {
			vectorField: 'vector',
			dimensions: 1536,
			filterFields: ['kind']
		}),

	questions: defineTable({
		question: v.string(),
		answer: v.optional(v.string()),
		likes: v.number(),
		status: v.union(v.literal('open'), v.literal('answered'), v.literal('deleted')),
		dateAsked: v.number(),
		dateAnswered: v.optional(v.number()),
		documentId: v.optional(v.id('documents'))
	})
		.index('by_status', ['status', 'dateAnswered'])
		.index('by_dateAsked', ['dateAsked']),

	photoMeta: defineTable({
		sourceId: v.string(),
		tags: v.array(v.string()),
		extraDescription: v.optional(v.string())
	}).index('by_sourceId', ['sourceId']),

	searchQueries: defineTable({
		clientKey: v.string(),
		query: v.string(),
		createdAt: v.number()
	}).index('by_client_created', ['clientKey', 'createdAt']),

	conversations: defineTable({
		clientKey: v.string(),
		title: v.string(),
		createdAt: v.number(),
		updatedAt: v.number()
	}).index('by_client_updated', ['clientKey', 'updatedAt']),

	messages: defineTable({
		conversationId: v.id('conversations'),
		role: v.union(v.literal('user'), v.literal('assistant')),
		text: v.string(),
		createdAt: v.number()
	}).index('by_conversation', ['conversationId', 'createdAt'])
});
