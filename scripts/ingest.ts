import { ConvexHttpClient } from 'convex/browser';
import { api } from '../src/convex/_generated/api';
import { collectSources } from '../src/lib/search/sources';
import { photoMetaRows } from '../src/lib/search/photo-tags';

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) throw new Error(`Missing ${name}`);
	return value;
}

async function main() {
	const url = requireEnv('PUBLIC_CONVEX_URL');
	const adminKey = requireEnv('CONVEX_ADMIN_KEY');
	const client = new ConvexHttpClient(url);
	const items = collectSources();
	await client.mutation(api.ingest.upsertPhotoMeta, { adminKey, rows: photoMetaRows() });
	const result = await client.mutation(api.ingest.upsertDocuments, { adminKey, items });
	console.log(`upserted ${result.upserted} documents for keyword search`);
	try {
		const embedded = await client.action(api.ingest.sync, { adminKey, items });
		console.log(`embedded ${embedded.upserted} documents`);
	} catch (error) {
		console.warn('Skipped embeddings (set OPENAI_API_KEY on the Convex deployment for semantic search)');
		if (error instanceof Error) console.warn(error.message);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
