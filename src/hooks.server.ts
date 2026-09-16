import { env } from '$env/dynamic/private';

if (env.OPENAI_API_KEY) {
	process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;
}
