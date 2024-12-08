import { MongoClient } from 'mongodb';
import type { Question } from './types';
import { MONGO_QnA_PASSWORD } from '$env/static/private';
import type { Actions } from '@sveltejs/kit';

const uri = `mongodb+srv://joemmalatesta:${MONGO_QnA_PASSWORD}@qa-cluster.ymmrk.mongodb.net/?retryWrites=true&w=majority&appName=qa-cluster`;
const client = new MongoClient(uri);

export async function load() {
    // TODO: add pagination
    try {
        await client.connect();
        const database = client.db('qna');
        const questions = database.collection('questions');
        const allQuestions = await questions.find({answer: {$ne: null}}).toArray();
        if (!allQuestions) {
            return {
                questions: []
            };
        }
        
        return {
            questions: allQuestions.map(doc => ({
                id: doc._id.toString(),
                question: doc.question,
                answer: doc.answer,
                date: doc.date
            })) as Question[]
        };
    } catch (error) {
        console.error('Database connection error:', error);
        return {
            questions: []
        };
    } finally {
        await client.close();
    }
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const question = data.get('question')?.toString();
        console.log(question);

        if (!question) {
            return {
                success: false,
                message: 'Question is required'
            };
        }

        try {
            await client.connect();
            const database = client.db('qna');
            const questions = database.collection('questions');

            await questions.insertOne({
                question,
                answer: null,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                deleted: false,
                likes: 0
            });

            return {
                success: true,
                message: 'Question sent. Check back soon for an answer.'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to send question. Try again later.'
            };
        } finally {
            await client.close();
        }
    }
} satisfies Actions ;