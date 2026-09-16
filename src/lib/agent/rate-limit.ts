type Window = { start: number; count: number };

const minuteHits = new Map<string, Window>();
const hourHits = new Map<string, Window>();

export const CHAT_LIMITS = {
	perMinute: 20,
	perHour: 80
};

export type RateLimitResult =
	| { ok: true }
	| { ok: false; window: 'minute' | 'hour'; retryAfter: number };

function bump(
	store: Map<string, Window>,
	key: string,
	now: number,
	windowMs: number,
	limit: number
): { ok: true } | { ok: false; retryAfter: number } {
	const current = store.get(key);
	if (!current || now - current.start >= windowMs) {
		store.set(key, { start: now, count: 1 });
		return { ok: true };
	}
	if (current.count >= limit) {
		return { ok: false, retryAfter: Math.ceil((current.start + windowMs - now) / 1000) };
	}
	current.count += 1;
	return { ok: true };
}

export function checkIpRateLimit(ip: string): RateLimitResult {
	const now = Date.now();
	const minute = bump(minuteHits, ip, now, 60_000, CHAT_LIMITS.perMinute);
	if (!minute.ok) return { ok: false, window: 'minute', retryAfter: minute.retryAfter };
	const hour = bump(hourHits, ip, now, 3_600_000, CHAT_LIMITS.perHour);
	if (!hour.ok) return { ok: false, window: 'hour', retryAfter: hour.retryAfter };
	return { ok: true };
}
