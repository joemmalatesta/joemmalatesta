import { MongoClient } from 'mongodb';
import type { Question } from './types';
import { MONGO_QnA_PASSWORD } from '$env/static/private';
import type { Actions } from '@sveltejs/kit';

const uri = `mongodb+srv://joemmalatesta:${MONGO_QnA_PASSWORD}@qa-cluster.ymmrk.mongodb.net/?retryWrites=true&w=majority&appName=qa-cluster`;
const client = new MongoClient(uri);

export async function load() {
    try {
        await client.connect();
        const database = client.db('qna');
        const questions = database.collection('questions');
        console.log(questions);
        // const allQuestions = await questions.find({}).toArray();
        // if (!allQuestions) {
        //     return {
        //         questions: []
        //     };
        // }
        
        // return {
        //     questions: allQuestions as unknown as Question[]
        // };
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
                error: 'Question is required'
            };
        }

        try {
            await client.connect();
            const database = client.db('qna');
            const questions = database.collection('questions');

            await questions.insertOne({
                question,
                answer: "Not answered yet",
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            });

            return {
                success: true
            };
        } catch (error) {
            console.error('Error saving question:', error);
            return {
                success: false,
                error: 'Failed to save question'
            };
        } finally {
            await client.close();
        }
    }
} satisfies Actions ;