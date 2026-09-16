import { env } from '$env/dynamic/private';
import { createAgentUIStreamResponse, type UIMessage } from 'ai';
import { siteAgent } from '$lib/agent/site-agent';
import { checkIpRateLimit } from '$lib/agent/rate-limit';
import {
	lastUserText,
	onlyUserAndAssistant,
	refusalStreamResponse,
	siteScopeRefusal
} from '$lib/agent/guardrails';
import type { RequestHandler } from './$types';

if (env.OPENAI_API_KEY) {
	process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const limited = checkIpRateLimit(getClientAddress());
	if (!limited.ok) {
		const wait =
			limited.window === 'minute' ? 'Give it a minute.' : 'Hourly cap — try again later.';
		return new Response(JSON.stringify({ error: wait }), {
			status: 429,
			headers: {
				'content-type': 'application/json',
				'retry-after': String(limited.retryAfter)
			}
		});
	}

	const body = await request.json();
	const uiMessages = onlyUserAndAssistant(
		(body.messages ?? body.uiMessages ?? []) as UIMessage[]
	).slice(-20);

	const refusal = siteScopeRefusal(lastUserText(uiMessages));
	if (refusal) return refusalStreamResponse(refusal);

	return createAgentUIStreamResponse({
		agent: siteAgent,
		uiMessages,
		onError: (error) => {
			const message = error instanceof Error ? error.message : '';
			if (/unauthenticated|incorrect api key|invalid_api_key|api key|api_key/i.test(message)) {
				return 'OpenAI key is missing or invalid. Restart the dev server after adding OPENAI_API_KEY.';
			}
			if (/rate.?limit|429/i.test(message)) {
				return 'OpenAI is rate-limiting this model. Wait a minute and try again.';
			}
			console.error(error);
			return message || 'The AI request failed.';
		}
	});
};
