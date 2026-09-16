import { json, type RequestHandler } from '@sveltejs/kit';
import { api } from '../../../../convex/_generated/api';
import { getConvex } from '$lib/convex';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const question = data?.args?.question ?? data?.question;

	if (!question) {
		return json({ success: false, message: 'Question not received' });
	}

	try {
		await getConvex().mutation(api.questions.ask, { question: String(question) });
		return json({
			success: true,
			message: 'Question sent. Check back soon for an answer.'
		});
	} catch {
		return json({
			success: false,
			message: 'Failed to send question. Try again later.'
		});
	}
};
