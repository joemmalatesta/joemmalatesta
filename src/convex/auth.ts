export function assertAdmin(adminKey: string) {
	const expected = process.env.CONVEX_ADMIN_KEY;
	if (!expected || adminKey !== expected) {
		throw new Error('Unauthorized');
	}
}
