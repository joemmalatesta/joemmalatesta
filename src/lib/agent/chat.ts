import {
	AbstractChat,
	DefaultChatTransport,
	type ChatState,
	type ChatStatus,
	type UIMessage
} from 'ai';

export type ChatListener = () => void;

function createState(onChange: ChatListener): ChatState<UIMessage> {
	let messages: UIMessage[] = [];
	let status: ChatStatus = 'ready';
	let error: Error | undefined;

	const notify = () => onChange();

	return {
		get messages() {
			return messages;
		},
		set messages(value) {
			messages = value;
			notify();
		},
		get status() {
			return status;
		},
		set status(value) {
			status = value;
			notify();
		},
		get error() {
			return error;
		},
		set error(value) {
			error = value;
			notify();
		},
		pushMessage(message) {
			messages = [...messages, message];
			notify();
		},
		popMessage() {
			messages = messages.slice(0, -1);
			notify();
		},
		replaceMessage(index, message) {
			const next = [...messages];
			next[index] = structuredClone(message);
			messages = next;
			notify();
		},
		snapshot: (thing) => structuredClone(thing)
	};
}

export class SiteChat extends AbstractChat<UIMessage> {
	constructor(onChange: ChatListener, initialMessages: UIMessage[] = []) {
		const state = createState(onChange);
		if (initialMessages.length) state.messages = initialMessages;
		super({
			transport: new DefaultChatTransport({ api: '/api/chat' }),
			state
		});
	}
}
