// This is a file for making the predictions of the model.
// https://codelabs.developers.google.com/tensorflowjs-transfer-learning-teachable-machine#0

import { json, type Cookies } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';
import { MongoClient } from 'mongodb';
import { MONGO_PASS } from '$env/static/private';
import type { trainingData } from '$lib/types';

const uri = `mongodb+srv://joemmalatesta:${MONGO_PASS}@trainingdata.zg3gy.mongodb.net/?retryWrites=true&w=majority&appName=trainingData`;
const client = new MongoClient(uri);

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { image, label } = await request.json();

	// Decode the base64 image
	const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
	const buffer = Buffer.from(base64Data, 'base64');
	const imageSize = buffer.length;
	const { url } = await put(`${label}.png`, buffer, {
		token: BLOB_READ_WRITE_TOKEN,
		access: 'public',
		contentType: 'image/png'
	});
	console.log('new image uploaded with url: ', url, " and size: ", imageSize);
	// imageData is now a string containing the decoded image data

	await addToMongo(url, label, cookies);

	return json({
		prediction: 'prediction'
	});
};

// Add to mongo with URL, Status (blank, approved, rejected), votes (yes for +3 no for -3), label, createdAt, lastVoted, totalVotes
async function addToMongo(
	url: string,
	label: string,
	cookies: Cookies
) {
	try {
		await client.connect();
		const database = client.db('trainingData');
		const collection = database.collection('data');
		const id: string = crypto.randomUUID();
		const data: trainingData = {
			id,
			url,
			label,
			status: 'undecided',
			votes: 0,
			createdAt: new Date(),
			lastVoted: new Date(),
			totalVotes: 0
		};
		// Set a cookie so they can't vote on ones they made.
		cookies.set(`voted_${id}`, 'true', {
			path: '/'
		});
		await collection.insertOne(data);
	} catch (error) {
		console.error('Error adding to MongoDB:', error);
		throw new Error('Failed to add data to MongoDB');
	}
}
