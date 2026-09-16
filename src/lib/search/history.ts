const CLIENT_KEY = 'site-search.clientKey';
const QUERY_IDS = 'site-search.queryIds';
const CONVERSATION_IDS = 'site-search.conversationIds';

function readIds(key: string): string[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
	} catch {
		return [];
	}
}

function writeIds(key: string, ids: string[]) {
	localStorage.setItem(key, JSON.stringify(ids.slice(0, 40)));
}

export function getClientKey(): string {
	let key = localStorage.getItem(CLIENT_KEY);
	if (!key) {
		key = crypto.randomUUID();
		localStorage.setItem(CLIENT_KEY, key);
	}
	return key;
}

export function rememberQueryId(id: string) {
	writeIds(QUERY_IDS, [id, ...readIds(QUERY_IDS).filter((existing) => existing !== id)]);
}

export function rememberConversationId(id: string) {
	writeIds(
		CONVERSATION_IDS,
		[id, ...readIds(CONVERSATION_IDS).filter((existing) => existing !== id)]
	);
}

export function forgetConversationId(id: string) {
	writeIds(
		CONVERSATION_IDS,
		readIds(CONVERSATION_IDS).filter((existing) => existing !== id)
	);
}

export function storedQueryIds(): string[] {
	return readIds(QUERY_IDS);
}

export function storedConversationIds(): string[] {
	return readIds(CONVERSATION_IDS);
}

export function clearStoredHistory() {
	writeIds(QUERY_IDS, []);
	writeIds(CONVERSATION_IDS, []);
}
