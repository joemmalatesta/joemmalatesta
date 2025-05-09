import { fail, redirect, type Actions, type Cookies } from '@sveltejs/kit';
import { ADMIN_PASSWORD } from '$env/static/private';
import type { Question } from '../types';
import { MongoClient } from 'mongodb';
import { MONGO_QnA_PASSWORD } from '$env/static/private';
import { ObjectId } from 'mongodb';

const uri = `mongodb+srv://joemmalatesta:${MONGO_QnA_PASSWORD}@qa-cluster.ymmrk.mongodb.net/?retryWrites=true&w=majority&appName=qa-cluster`;
const client = new MongoClient(uri);

export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const password = data.get('qnaPassword');

		if (!password) {
			return fail(400, { missing: true });
		}

		if (password !== ADMIN_PASSWORD) {
			return fail(400, { incorrect: true });
		}

		const { unansweredQuestions, deletedQuestions, answeredQuestions } = await getQuestions();
		return {
			authenticated: true,
			unansweredQuestions,
			deletedQuestions,
			answeredQuestions
		};
	},

	answer: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const answer = data.get('answer');

		if (!answer) {
			return fail(400, { failedId: id });
		}

		await client.connect();
		const database = client.db('qna');
		const questions = database.collection('questions');
		await questions.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { answer, dateAnswered: new Date() } }
		);
		const { unansweredQuestions, deletedQuestions, answeredQuestions } = await getQuestions();
		return {
			success: true,
			unansweredQuestions,
			deletedQuestions,
			answeredQuestions
		};
	},

	delete: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = data.get('id') as string;
			const confirmation = data.get('confirmation') as string;
			if (confirmation !== 'delete') {
				return fail(400, { failedId: id });
			}
			await client.connect();
			const database = client.db('qna');
			const questions = database.collection('questions');
			await questions.updateOne({ _id: new ObjectId(id) }, { $set: { deleted: true } });
			const { unansweredQuestions, deletedQuestions, answeredQuestions } = await getQuestions();
			return {
				success: true,
				unansweredQuestions,
				deletedQuestions,
				answeredQuestions
			};
		} catch (error) {
			console.error('Error deleting question:', error);
			return fail(500, { error: 'Failed to delete question' });
		}
	},

	restore: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = data.get('id') as string;

			// Remove the deleted flag from the question
			await client.connect();
			const database = client.db('qna');
			const questions = database.collection('questions');
			await questions.updateOne({ _id: new ObjectId(id) }, { $unset: { deleted: '' } });
			const { unansweredQuestions, deletedQuestions, answeredQuestions } = await getQuestions();
			return {
				success: true,
				unansweredQuestions,
				deletedQuestions,
				answeredQuestions
			};
		} catch (error) {
			console.error('Error restoring question:', error);
			return fail(500, { error: 'Failed to restore question' });
		}
	},
	deleteForGood: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = data.get('id') as string;
			await client.connect();
			const database = client.db('qna');
			const questions = database.collection('questions');
			await questions.deleteOne({ _id: new ObjectId(id) });
			const { unansweredQuestions, deletedQuestions, answeredQuestions } = await getQuestions();
			return {
				success: true,
				unansweredQuestions,
				deletedQuestions,
				answeredQuestions
			};
		} catch (error) {
			console.error('Error deleting question:', error);
			return fail(500, { error: 'Failed to delete question' });
		}
	},

	clearAnswer: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = data.get('id') as string;
			await client.connect();
			const database = client.db('qna');
			const questions = database.collection('questions');
			await questions.updateOne(
				{ _id: new ObjectId(id) },
				{ $unset: { answer: null, dateAnswered: null, likes: 0, deleted: false } }
			);
			const { unansweredQuestions, deletedQuestions, answeredQuestions } = await getQuestions();
			return {
				success: true,
				unansweredQuestions,
				deletedQuestions,
				answeredQuestions
			};
		} catch (error) {
			console.error('Error clearing answer:', error);
			return fail(500, { error: 'Failed to clear answer' });
		}
	}
} satisfies Actions;

async function getQuestions() {
	await client.connect();
	const database = client.db('qna');
	const questions = database.collection('questions');
	const allQuestions = await questions.find({}).sort({ dateAsked: -1 }).toArray();
	const unansweredQuestions = allQuestions.filter((doc) => !doc.answer && !doc.deleted);
	const deletedQuestions = allQuestions.filter((doc) => doc.deleted);
	const answeredQuestions = allQuestions
		.filter((doc) => doc.answer && !doc.deleted)
		.sort((a, b) => new Date(b.dateAnswered).getTime() - new Date(a.dateAnswered).getTime());
	return { unansweredQuestions: unansweredQuestions.map((doc) => ({
		id: doc._id.toString(),
		question: doc.question,
		answer: doc.answer,
		dateAsked: doc.dateAsked
	})), deletedQuestions: deletedQuestions.map((doc) => ({
		id: doc._id.toString(),
		question: doc.question,
		answer: doc.answer,
		dateAsked: doc.dateAsked
	})), answeredQuestions: answeredQuestions.map((doc) => ({
		id: doc._id.toString(),
		question: doc.question,
		answer: doc.answer,
		dateAsked: doc.dateAsked
	}))
	};
}
