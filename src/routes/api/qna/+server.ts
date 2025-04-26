import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const { question } = data;

	console.log('Received question:', question);

	return json({ message: 'Question received successfully' });
};
