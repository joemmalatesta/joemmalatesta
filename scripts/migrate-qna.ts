import { MongoClient } from 'mongodb';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../src/convex/_generated/api';

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) throw new Error(`Missing ${name}`);
	return value;
}

function toMs(value: unknown): number {
	if (typeof value === 'number') return value;
	if (value instanceof Date) return value.getTime();
	if (typeof value === 'string') {
		const parsed = Date.parse(value);
		if (!Number.isNaN(parsed)) return parsed;
	}
	return Date.now();
}

async function main() {
	const mongoPassword = requireEnv('MONGO_QnA_PASSWORD');
	const url = requireEnv('PUBLIC_CONVEX_URL');
	const adminKey = requireEnv('CONVEX_ADMIN_KEY');
	const mongo = new MongoClient(
		`mongodb+srv://joemmalatesta:${mongoPassword}@qa-cluster.ymmrk.mongodb.net/?retryWrites=true&w=majority&appName=qa-cluster`
	);
	await mongo.connect();
	const docs = await mongo.db('qna').collection('questions').find({}).toArray();
	await mongo.close();

	const rows = docs.map((doc) => {
		const answer = typeof doc.answer === 'string' && doc.answer.trim() ? doc.answer : undefined;
		const deleted = Boolean(doc.deleted);
		const status = deleted ? 'deleted' : answer ? 'answered' : 'open';
		return {
			question: String(doc.question ?? ''),
			answer,
			likes: typeof doc.likes === 'number' ? doc.likes : 0,
			status: status as 'open' | 'answered' | 'deleted',
			dateAsked: toMs(doc.dateAsked),
			dateAnswered: answer ? toMs(doc.dateAnswered ?? doc.dateAsked) : undefined
		};
	});

	const client = new ConvexHttpClient(url);
	const result = await client.mutation(api.questions.importMany, { adminKey, rows });
	console.log(`imported ${result.imported} questions from Mongo`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
