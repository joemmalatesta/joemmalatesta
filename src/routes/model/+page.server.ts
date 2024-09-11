import type { PageServerLoad } from '../model/$types';
import { MongoClient } from 'mongodb';
import type { trainingData } from '$lib/types';
import { MONGO_PASS } from '$env/static/private';
const uri = `mongodb+srv://joemmalatesta:${MONGO_PASS}@trainingdata.zg3gy.mongodb.net/?retryWrites=true&w=majority&appName=trainingData`;
const client = new MongoClient(uri);
const database = client.db('trainingData');
const collection = database.collection('data');

export const load: PageServerLoad = async ({ params, cookies }) => {
	// Get images that have not yet been approved or rejected.
	cookies.set('test', 'test', {
		path: '/'
	});
	const undecidedData = await fetchVotableData(cookies);
	return {
		undecidedData
	};
};

import { fail, type Cookies } from '@sveltejs/kit';
import type { Actions } from '../model/$types';

export const actions: Actions = {
	vote: async ({ request, cookies }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const vote = formData.get('vote') as string;

		if (!id || !vote) {
			return fail(400, { message: 'Missing id or vote' });
		}

		try {
			await client.connect();
			const result = await collection.findOneAndUpdate(
				{ id: id },
				{
					$inc: {
						votes: vote === 'yes' ? 1 : -1,
						totalVotes: 1
					},
					$set: { lastVoted: new Date() }
				},
				{ returnDocument: 'after' }
			);

			// Set a cookie to remember this vote
			cookies.set(`voted_${id}`, 'true', {
				path: '/'
			});
			console.log('voted on ', id, ' with vote ', vote);

			return { success: true };
		} catch (error) {
			console.error('Error voting:', error);
			return fail(500, { message: 'Failed to submit vote' });
		} finally {
			await client.close();
		}
	}
};

async function fetchVotableData(cookies: Cookies): Promise<trainingData[]> {
	try {
		await client.connect();
		const undecidedData = await collection.find({ status: 'undecided' }).toArray();

		// Omit _id from each document
		const serializedData = undecidedData.map(({ _id, ...rest }) => rest);

		// Check if the user has voted for any of the images
		const votedImages = cookies.getAll()
			.filter((cookie) => cookie.name.startsWith('voted_'))
			.map((cookie) => cookie.name.replace('voted_', ''));
		console.log('Voted images:', votedImages);
		// Filter out the images that the user has already voted on
		const filteredData = serializedData.filter((data) => !votedImages.includes(data.id));

		return filteredData as unknown as trainingData[];
	} catch (error) {
		console.error('Error fetching undecided data:', error);
		throw new Error('Failed to fetch undecided data from MongoDB');
	} finally {
		await client.close();
	}
}
