import { createUIMessageStream, createUIMessageStreamResponse, type UIMessage } from 'ai';

/**
 * Pre-LLM wall. The prompt in voice.ts is a speed bump — nano will still
 * meow back or write a React component if that's all we have. These
 * patterns never reach the model.
 *
 * Closest analogue: Tim Schipper's site bot (hard REFUSE list + server
 * proxy). Prompt is tone. This file is the actual gate.
 */
export function lastUserText(messages: UIMessage[]): string {
	for (let i = messages.length - 1; i >= 0; i--) {
		const message = messages[i];
		if (!message || message.role !== 'user') continue;
		const text = message.parts
			.filter((part): part is { type: 'text'; text: string } => part.type === 'text')
			.map((part) => part.text)
			.join('\n')
			.trim();
		if (text) return text;
	}
	return '';
}

export function onlyUserAndAssistant(messages: UIMessage[]): UIMessage[] {
	return messages.filter((message) => message.role === 'user' || message.role === 'assistant');
}

export function siteScopeRefusal(text: string): string | null {
	const t = text.trim();
	if (!t) return null;

	if (
		/ignore\s+(all\s+|the\s+)?(previous|prior|above|your)\s+(instructions|prompt|rules)/i.test(t) ||
		/\b(jailbreak|dan mode|developer mode)\b/i.test(t) ||
		/\byou are now\b.{0,40}\b(chatgpt|gpt|claude|gemini|assistant|helpful|dan)\b/i.test(t) ||
		/\bpretend (to be|you('re| are))\b/i.test(t) ||
		/\b(system prompt|reveal your (prompt|instructions))\b/i.test(t)
	) {
		return 'Still Joe, still this site. Try a project or a post.';
	}

	if (wantsGeneratedCode(t)) {
		return "I'm not going to write your code. If you want to see how I build things, [projects](/) and [writing](/writing) are the place.";
	}

	return null;
}

function wantsGeneratedCode(text: string): boolean {
	if (/\b(leetcode|do my homework|write me (some )?code|solve this (problem|equation))\b/i.test(text)) {
		return true;
	}
	const asking =
		/^(can you|could you|would you|please|hey,?\s*)?\s*(write|generate|create|scaffold|make|build)\b/i.test(
			text
		) || /\b(write|generate|create|scaffold)\s+me\b/i.test(text);
	const codey =
		/\b(react|vue|svelte|angular|next\.?js|component|hook|snippet|boilerplate|function|script)\b/i.test(
			text
		);
	return asking && codey;
}

export function refusalStreamResponse(text: string): Response {
	const stream = createUIMessageStream({
		execute: ({ writer }) => {
			const id = 'refusal';
			writer.write({ type: 'start' });
			writer.write({ type: 'text-start', id });
			writer.write({ type: 'text-delta', id, delta: text });
			writer.write({ type: 'text-end', id });
			writer.write({ type: 'finish' });
		}
	});
	return createUIMessageStreamResponse({ stream });
}
