import { ConvexHttpClient } from 'convex/browser';
import { PUBLIC_CONVEX_URL } from '$env/static/public';

let client: ConvexHttpClient | null = null;

export function getConvex(): ConvexHttpClient {
	if (!PUBLIC_CONVEX_URL) {
		throw new Error('Missing PUBLIC_CONVEX_URL');
	}
	if (!client) {
		client = new ConvexHttpClient(PUBLIC_CONVEX_URL);
	}
	return client;
}

export function hasConvex(): boolean {
	return Boolean(PUBLIC_CONVEX_URL);
}
