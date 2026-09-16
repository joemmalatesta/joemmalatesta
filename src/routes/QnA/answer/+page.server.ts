import { fail, type Actions } from '@sveltejs/kit';
import { ADMIN_PASSWORD, CONVEX_ADMIN_KEY } from '$env/static/private';
import { api } from '../../../convex/_generated/api';
import { getConvex } from '$lib/convex';

function adminKey() {
	return CONVEX_ADMIN_KEY || ADMIN_PASSWORD;
}

async function buckets() {
	return getConvex().query(api.questions.listAdmin, { adminKey: adminKey() });
}

export const actions = {
	login: async ({ request }) => {
		const password = (await request.formData()).get('qnaPassword');
		if (!password) return fail(400, { missing: true });
		if (password !== ADMIN_PASSWORD) return fail(400, { incorrect: true });
		try {
			const data = await buckets();
			return { authenticated: true, ...data };
		} catch (error) {
			console.error(error);
			return fail(500, { error: 'Failed to load questions' });
		}
	},

	answer: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const answer = data.get('answer')?.toString();
		if (!answer) return fail(400, { failedId: id });
		await getConvex().mutation(api.questions.answer, { adminKey: adminKey(), id: id as never, answer });
		return { success: true, ...(await buckets()) };
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (data.get('confirmation') !== 'delete') return fail(400, { failedId: id });
		await getConvex().mutation(api.questions.setStatus, {
			adminKey: adminKey(),
			id: id as never,
			status: 'deleted'
		});
		return { success: true, ...(await buckets()) };
	},

	restore: async ({ request }) => {
		const id = (await request.formData()).get('id') as string;
		const convex = getConvex();
		const admin = adminKey();
		const all = await convex.query(api.questions.listAdmin, { adminKey: admin });
		const row = [...all.unansweredQuestions, ...all.answeredQuestions, ...all.deletedQuestions].find(
			(q) => q.id === id
		);
		await convex.mutation(api.questions.setStatus, {
			adminKey: admin,
			id: id as never,
			status: row?.answer ? 'answered' : 'open'
		});
		return { success: true, ...(await buckets()) };
	},

	deleteForGood: async ({ request }) => {
		const id = (await request.formData()).get('id') as string;
		await getConvex().mutation(api.questions.remove, { adminKey: adminKey(), id: id as never });
		return { success: true, ...(await buckets()) };
	},

	clearAnswer: async ({ request }) => {
		const id = (await request.formData()).get('id') as string;
		await getConvex().mutation(api.questions.clearAnswer, { adminKey: adminKey(), id: id as never });
		return { success: true, ...(await buckets()) };
	}
} satisfies Actions;
