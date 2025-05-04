import { MongoClient } from 'mongodb';
import type { Question } from './types';
import { MONGO_QnA_PASSWORD } from '$env/static/private';
import type { Actions } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

const uri = `mongodb+srv://joemmalatesta:${MONGO_QnA_PASSWORD}@qa-cluster.ymmrk.mongodb.net/?retryWrites=true&w=majority&appName=qa-cluster`;
const client = new MongoClient(uri);

export async function load() {
    // TODO: add pagination
    try {
        await client.connect();
        const database = client.db('qna');
        const questions = database.collection('questions');
        const allQuestions = await questions.find({answer: {$ne: null}}).sort({dateAnswered: -1}).toArray();
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
                dateAsked: doc.dateAsked,
                dateAnswered: doc.dateAnswered,
                likes: doc.likes
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
    askQuestion: async ({ request }) => {
        const data = await request.formData();
        const question = data.get('question')?.toString();

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
                dateAsked: new Date(),
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
    },
    likeQuestion: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id')?.toString();

        try {
            await client.connect();
            const database = client.db('qna');
            const questions = database.collection('questions');
            await questions.updateOne({ _id: new ObjectId(id) }, { $inc: { likes: 1 } });
            return {
                success: true,
                message: 'Question liked.'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to like question. Try again later.'
            };
        } finally {
            await client.close();
        }
    },
    unlikeQuestion: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id')?.toString();

        try {
            await client.connect();
            const database = client.db('qna');
            const questions = database.collection('questions');
            await questions.updateOne({ _id: new ObjectId(id) }, { $inc: { likes: -1 } });
            return {
                success: true,
                message: 'Question unliked.'
            };
        } catch (error) {
            return {
                success: false,
                message: 'Failed to unlike question. Try again later.'
            };
        } finally {
            await client.close();
        }
    },
} satisfies Actions ;
