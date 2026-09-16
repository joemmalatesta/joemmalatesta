import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

const CLIENT_KEY_MIN = 16;
const CLIENT_KEY_MAX = 128;

function assertClientKey(clientKey: string) {
	if (clientKey.length < CLIENT_KEY_MIN || clientKey.length > CLIENT_KEY_MAX) {
		throw new Error('Invalid client key');
	}
}

const queryRow = v.object({
	_id: v.id('searchQueries'),
	query: v.string(),
	createdAt: v.number()
});

const conversationRow = v.object({
	_id: v.id('conversations'),
	title: v.string(),
	updatedAt: v.number()
});

const messageRow = v.object({
	_id: v.id('messages'),
	role: v.union(v.literal('user'), v.literal('assistant')),
	text: v.string(),
	createdAt: v.number()
});

export const saveQuery = mutation({
	args: { clientKey: v.string(), query: v.string() },
	returns: v.id('searchQueries'),
	handler: async (ctx, args) => {
		assertClientKey(args.clientKey);
		const query = args.query.trim().slice(0, 200);
		if (query.length < 2) throw new Error('Query is too short');

		const latest = await ctx.db
			.query('searchQueries')
			.withIndex('by_client_created', (q) => q.eq('clientKey', args.clientKey))
			.order('desc')
			.first();
		if (latest && latest.query === query) {
			await ctx.db.patch(latest._id, { createdAt: Date.now() });
			return latest._id;
		}

		return await ctx.db.insert('searchQueries', {
			clientKey: args.clientKey,
			query,
			createdAt: Date.now()
		});
	}
});

export const listQueries = query({
	args: {
		clientKey: v.string(),
		ids: v.optional(v.array(v.id('searchQueries')))
	},
	returns: v.array(queryRow),
	handler: async (ctx, args) => {
		assertClientKey(args.clientKey);
		if (args.ids !== undefined) {
			const rows = [];
			for (const id of args.ids.slice(0, 40)) {
				const row = await ctx.db.get(id);
				if (row && row.clientKey === args.clientKey) {
					rows.push({ _id: row._id, query: row.query, createdAt: row.createdAt });
				}
			}
			return rows;
		}
		const rows = await ctx.db
			.query('searchQueries')
			.withIndex('by_client_created', (q) => q.eq('clientKey', args.clientKey))
			.order('desc')
			.take(20);
		return rows.map((row) => ({ _id: row._id, query: row.query, createdAt: row.createdAt }));
	}
});

export const createConversation = mutation({
	args: { clientKey: v.string(), title: v.string() },
	returns: v.id('conversations'),
	handler: async (ctx, args) => {
		assertClientKey(args.clientKey);
		const now = Date.now();
		return await ctx.db.insert('conversations', {
			clientKey: args.clientKey,
			title: args.title.trim().slice(0, 80) || 'New chat',
			createdAt: now,
			updatedAt: now
		});
	}
});

export const appendMessage = mutation({
	args: {
		clientKey: v.string(),
		conversationId: v.id('conversations'),
		role: v.union(v.literal('user'), v.literal('assistant')),
		text: v.string()
	},
	returns: v.id('messages'),
	handler: async (ctx, args) => {
		assertClientKey(args.clientKey);
		const conversation = await ctx.db.get(args.conversationId);
		if (!conversation || conversation.clientKey !== args.clientKey) {
			throw new Error('Conversation not found');
		}
		const text = args.text.trim();
		if (!text) throw new Error('Message is empty');
		const createdAt = Date.now();
		const id = await ctx.db.insert('messages', {
			conversationId: args.conversationId,
			role: args.role,
			text,
			createdAt
		});
		const title =
			args.role === 'user' && conversation.title === 'New chat'
				? text.slice(0, 80)
				: conversation.title;
		await ctx.db.patch(args.conversationId, { updatedAt: createdAt, title });
		return id;
	}
});

export const listConversations = query({
	args: {
		clientKey: v.string(),
		ids: v.optional(v.array(v.id('conversations')))
	},
	returns: v.array(conversationRow),
	handler: async (ctx, args) => {
		assertClientKey(args.clientKey);
		if (args.ids !== undefined) {
			const rows = [];
			for (const id of args.ids.slice(0, 40)) {
				const row = await ctx.db.get(id);
				if (row && row.clientKey === args.clientKey) {
					rows.push({ _id: row._id, title: row.title, updatedAt: row.updatedAt });
				}
			}
			return rows;
		}
		const rows = await ctx.db
			.query('conversations')
			.withIndex('by_client_updated', (q) => q.eq('clientKey', args.clientKey))
			.order('desc')
			.take(20);
		return rows.map((row) => ({ _id: row._id, title: row.title, updatedAt: row.updatedAt }));
	}
});

export const getConversation = query({
	args: { clientKey: v.string(), conversationId: v.id('conversations') },
	returns: v.union(
		v.null(),
		v.object({
			_id: v.id('conversations'),
			title: v.string(),
			updatedAt: v.number(),
			messages: v.array(messageRow)
		})
	),
	handler: async (ctx, args) => {
		assertClientKey(args.clientKey);
		const conversation = await ctx.db.get(args.conversationId);
		if (!conversation || conversation.clientKey !== args.clientKey) return null;
		const messages = await ctx.db
			.query('messages')
			.withIndex('by_conversation', (q) => q.eq('conversationId', args.conversationId))
			.order('asc')
			.take(100);
		return {
			_id: conversation._id,
			title: conversation.title,
			updatedAt: conversation.updatedAt,
			messages: messages.map((row) => ({
				_id: row._id,
				role: row.role,
				text: row.text,
				createdAt: row.createdAt
			}))
		};
	}
});

export const removeConversation = mutation({
	args: { clientKey: v.string(), conversationId: v.id('conversations') },
	returns: v.null(),
	handler: async (ctx, args) => {
		assertClientKey(args.clientKey);
		const conversation = await ctx.db.get(args.conversationId);
		if (!conversation || conversation.clientKey !== args.clientKey) return null;
		const messages = await ctx.db
			.query('messages')
			.withIndex('by_conversation', (q) => q.eq('conversationId', args.conversationId))
			.take(200);
		for (const message of messages) {
			await ctx.db.delete(message._id);
		}
		await ctx.db.delete(args.conversationId);
		return null;
	}
});

export const clearHistory = mutation({
	args: { clientKey: v.string() },
	returns: v.null(),
	handler: async (ctx, args) => {
		assertClientKey(args.clientKey);
		const queries = await ctx.db
			.query('searchQueries')
			.withIndex('by_client_created', (q) => q.eq('clientKey', args.clientKey))
			.take(200);
		for (const row of queries) {
			await ctx.db.delete(row._id);
		}
		const conversations = await ctx.db
			.query('conversations')
			.withIndex('by_client_updated', (q) => q.eq('clientKey', args.clientKey))
			.take(200);
		for (const conversation of conversations) {
			const messages = await ctx.db
				.query('messages')
				.withIndex('by_conversation', (q) => q.eq('conversationId', conversation._id))
				.take(200);
			for (const message of messages) {
				await ctx.db.delete(message._id);
			}
			await ctx.db.delete(conversation._id);
		}
		return null;
	}
});
