import { fail, redirect, type Actions } from '@sveltejs/kit';
import { ADMIN_PASSWORD } from '$env/static/private';
import type { Question } from '../types';
import { MongoClient } from 'mongodb';
import { MONGO_QnA_PASSWORD } from '$env/static/private';
import { ObjectId } from 'mongodb';

const uri = `mongodb+srv://joemmalatesta:${MONGO_QnA_PASSWORD}@qa-cluster.ymmrk.mongodb.net/?retryWrites=true&w=majority&appName=qa-cluster`;
const client = new MongoClient(uri);

export const load = async ({ cookies }) => {
    const admin = cookies.get('admin');
    if (!admin) {
        return {
            authenticated: false
        };
    }

    await client.connect();
    const database = client.db('qna');
    const questions = database.collection('questions');
    const unansweredQuestions = await questions.find({answer: null, deleted: false}).sort({date: -1}).toArray();
    return {
        authenticated: true,
        questions: unansweredQuestions.map(doc => ({
            id: doc._id.toString(),
            question: doc.question,
            answer: doc.answer,
            dateAsked: doc.dateAsked
        })) as Question[]
    };
};


export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const password = data.get('password');

        if (!password) {
            return fail(400, { missing: true });
        }

        if (password !== ADMIN_PASSWORD) {
            return fail(400, { incorrect: true });
        }
        cookies.set('admin', 'true', { path: '/' });
        throw redirect(303, '/QnA/answer');
        return {
            success: true
        };
    },

    answer: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const answer = data.get('answer');

        await client.connect();
        const database = client.db('qna');
        const questions = database.collection('questions');
        await questions.updateOne({ _id: new ObjectId(id) }, { $set: { answer, dateAnswered: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) } });
        return {
            success: true
        };
    },


    delete: async ({ request }) => {
        try {
            const data = await request.formData();
            const id = data.get('id');
            // mark as deleted in db
            await client.connect();
            const database = client.db('qna');
            const questions = database.collection('questions');
            await questions.updateOne({ _id: new ObjectId(id) }, { $set: { deleted: true } });
            console.log('deleted');
            return {
                success: true
            };
        } catch (error) {
            console.error('Error deleting question:', error);
            return fail(500, { error: 'Failed to delete question' });
        }
    }
} satisfies Actions;
