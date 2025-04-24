import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const dummyQnA = [
		{
			question: "What's your favorite programming language?",
			answer: 'I love TypeScript for its type safety and developer experience!'
		},
		{
			question: 'What do you do in your free time?',
			answer: 'I enjoy surfing, playing tennis, and exploring new places.'
		},
		{
			question: 'Why did you get into programming?',
			answer:
				'I was fascinated by the ability to create things from scratch and solve real-world problems.'
		}
	];

	return json(dummyQnA);
};
