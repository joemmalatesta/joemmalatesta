import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { MongoClient } from 'mongodb';
import { MONGO_QnA_PASSWORD } from '$env/static/private';

const uri = `mongodb+srv://joemmalatesta:${MONGO_QnA_PASSWORD}@qa-cluster.ymmrk.mongodb.net/?retryWrites=true&w=majority&appName=qa-cluster`;
const client = new MongoClient(uri);

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const { question } = data.args;

	if (!question) {
		return json({
			success: false,
			message: 'Question not received'
		});
	}

	try {
		await client.connect();
		const database = client.db('qna');
		const questions = database.collection('questions');

		await questions.insertOne({
			question,
			answer: null,
			dateAsked: new Date().toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			}),
			deleted: false,
			likes: 0
		});

		return json({
			success: true,
			message: 'Question sent. Check back soon for an answer.'
		});
	} catch (error) {
		return json({
			success: false,
			message: 'Failed to send question. Try again later.'
		});
	} finally {
		await client.close();
	}
};