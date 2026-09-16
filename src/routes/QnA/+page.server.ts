import type { Actions } from '@sveltejs/kit';
import { api } from '../../convex/_generated/api';
import { getConvex } from '$lib/convex';
import type { Question } from './types';

export async function load() {
	try {
		const questions = (await getConvex().query(api.questions.listAnswered, {})) as Question[];
		return { questions };
	} catch (error) {
		console.error('Q&A load error:', error);
		return { questions: [] as Question[] };
	}
}

export const actions = {
	askQuestion: async ({ request }) => {
		const question = (await request.formData()).get('question')?.toString();
		if (!question) {
			return { success: false, message: 'Question is required' };
		}
		try {
			await getConvex().mutation(api.questions.ask, { question });
			return { success: true, message: 'Question sent. Check back soon for an answer.' };
		} catch {
			return { success: false, message: 'Failed to send question. Try again later.' };
		}
	},
	likeQuestion: async ({ request }) => {
		const id = (await request.formData()).get('id')?.toString();
		if (!id) return { success: false, message: 'Missing question' };
		try {
			await getConvex().mutation(api.questions.like, { id: id as never, delta: 1 });
			return { success: true, message: 'Question liked.' };
		} catch {
			return { success: false, message: 'Failed to like question. Try again later.' };
		}
	},
	unlikeQuestion: async ({ request }) => {
		const id = (await request.formData()).get('id')?.toString();
		if (!id) return { success: false, message: 'Missing question' };
		try {
			await getConvex().mutation(api.questions.like, { id: id as never, delta: -1 });
			return { success: true, message: 'Question unliked.' };
		} catch {
			return { success: false, message: 'Failed to unlike question. Try again later.' };
		}
	}
} satisfies Actions;
