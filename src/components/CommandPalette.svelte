<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
	import ClockCounterClockwise from 'phosphor-svelte/lib/ClockCounterClockwise';
	import ChatCircle from 'phosphor-svelte/lib/ChatCircle';
	import Plus from 'phosphor-svelte/lib/Plus';
	import Article from 'phosphor-svelte/lib/Article';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
	import Cube from 'phosphor-svelte/lib/Cube';
	import BookmarkSimple from 'phosphor-svelte/lib/BookmarkSimple';
	import Camera from 'phosphor-svelte/lib/Camera';
	import Question from 'phosphor-svelte/lib/Question';
	import FileText from 'phosphor-svelte/lib/FileText';
	import { goto } from '$app/navigation';
	import { getConvex, hasConvex } from '$lib/convex';
	import { api } from '../convex/_generated/api';
	import { SiteChat } from '$lib/agent/chat';
	import { collapsePageHits, flatResults, mergeHits, resultSections } from '$lib/search/merge';
	import type { SearchHit } from '$lib/search/types';
	import {
		clearStoredHistory,
		getClientKey,
		rememberConversationId,
		rememberQueryId,
		storedConversationIds,
		storedQueryIds
	} from '$lib/search/history';
	import type { UIMessage } from 'ai';
	import type { Id } from '../convex/_generated/dataModel';

	type RecentQuery = { _id: string; query: string; createdAt: number };
	type RecentConversation = { _id: string; title: string; updatedAt: number };
	type HomeItem =
		| { type: 'conversation'; id: string; title: string; at: number }
		| { type: 'query'; id: string; title: string; at: number };

	let open = false;
	let query = '';
	let results: SearchHit[] = [];
	let loading = false;
	let semanticLoading = false;
	let selected = 0;
	let mode: 'lookup' | 'chat' = 'lookup';
	let chatTick = 0;
	let chat: SiteChat | null = null;
	let inputEl: HTMLInputElement;
	let listEl: HTMLDivElement;
	let debounce: ReturnType<typeof setTimeout> | undefined;
	let semanticDebounce: ReturnType<typeof setTimeout> | undefined;
	let saveQueryDebounce: ReturnType<typeof setTimeout> | undefined;
	let recentQueries: RecentQuery[] = [];
	let recentConversations: RecentConversation[] = [];
	let historyLoad = 0;
	let conversationId: string | null = null;
	let expectAssistant = false;
	let lastAssistantText = '';
	let cmdHeld = false;
	let pointerNav = true;

	const suggestions = [
		'Vietnam photos',
		'Sentry work',
		'latest writing',
		'Grove',
		'film in San Francisco'
	];

	$: homeItems = [
		...recentConversations.map(
			(row): HomeItem => ({
				type: 'conversation',
				id: row._id,
				title: row.title,
				at: row.updatedAt
			})
		),
		...recentQueries.map(
			(row): HomeItem => ({ type: 'query', id: row._id, title: row.query, at: row.createdAt })
		)
	].sort((a, b) => b.at - a.at);

	function formatAgo(at: number): string {
		const diff = Math.max(0, Date.now() - at);
		const minute = 60_000;
		const hour = 60 * minute;
		const day = 24 * hour;
		if (diff < 45_000) return 'just now';
		if (diff < hour) return `${Math.max(1, Math.round(diff / minute))}m ago`;
		if (diff < day) return `${Math.round(diff / hour)}h ago`;
		if (diff < 7 * day) return `${Math.round(diff / day)}d ago`;
		return new Date(at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	}

	function activeList() {
		return query.trim().length < 2 && mode === 'lookup' ? homeItems : flatResults(results);
	}

	$: chatMessages = (chatTick, (chat?.messages ?? []) as UIMessage[]);
	$: chatStatus = (chatTick, chat?.status ?? 'ready');
	$: chatError = (chatTick, chat?.error);
	$: thinkingVisible =
		chatTick >= 0 &&
		(chatStatus === 'submitted' || chatStatus === 'streaming') &&
		!messageText(
			[...chatMessages].reverse().find((message) => message.role === 'assistant') ?? {
				id: '',
				role: 'assistant',
				parts: []
			}
		);

	function chatErrorText(error: unknown) {
		const message = error instanceof Error ? error.message : '';
		if (/unauthenticated|incorrect api key|invalid_api_key|api key|api_key/i.test(message)) {
			return 'OpenAI key is missing or invalid. Restart the dev server after adding OPENAI_API_KEY.';
		}
		if (/429|too many|rate.?limit|Give it a minute|Hourly cap/i.test(message)) {
			return 'Slow down a second — too many asks from this connection.';
		}
		return message || 'The AI request failed.';
	}
	$: void chatTick;
	$: if (expectAssistant && chatStatus === 'ready') {
		expectAssistant = false;
		void persistAssistant();
	}

	onMount(() => {
		chat = new SiteChat(() => {
			chatTick += 1;
		});
		window.addEventListener('keydown', onGlobalKey, true);
		window.addEventListener('keyup', onGlobalKeyUp, true);
		window.addEventListener('blur', clearCmdHeld);
		void loadHistory();
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', onGlobalKey, true);
			window.removeEventListener('keyup', onGlobalKeyUp, true);
			window.removeEventListener('blur', clearCmdHeld);
		}
		clearTimeout(debounce);
		clearTimeout(semanticDebounce);
		clearTimeout(saveQueryDebounce);
	});

	function syncCmdHeld(event: KeyboardEvent) {
		cmdHeld = event.metaKey || event.ctrlKey;
	}

	function clearCmdHeld() {
		cmdHeld = false;
	}

	function onGlobalKeyUp(event: KeyboardEvent) {
		if (
			event.key === 'Meta' ||
			event.key === 'Control' ||
			event.code === 'MetaLeft' ||
			event.code === 'MetaRight' ||
			event.code === 'ControlLeft' ||
			event.code === 'ControlRight'
		) {
			clearCmdHeld();
			return;
		}
		syncCmdHeld(event);
	}

	function onGlobalKey(event: KeyboardEvent) {
		syncCmdHeld(event);
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			void toggle();
			return;
		}
		if (!open) return;
		if (event.key === 'Escape') {
			event.preventDefault();
			if (mode === 'chat') resetLookup();
			else close();
			return;
		}
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'n') {
			event.preventDefault();
			newConversation();
			return;
		}
		const jump = shortcutIndex(event);
		if (jump !== null && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			void activateIndex(jump);
		}
	}

	async function toggle() {
		if (open) close();
		else await show();
	}

	async function show() {
		open = true;
		await loadHistory();
		await tick();
		inputEl?.focus();
	}

	function close() {
		open = false;
		clearCmdHeld();
	}

	function resetLookup() {
		mode = 'lookup';
		selected = 0;
	}

	function startFreshChat() {
		conversationId = null;
		lastAssistantText = '';
		expectAssistant = false;
		chat = new SiteChat(() => {
			chatTick += 1;
		});
	}

	function newConversation() {
		startFreshChat();
		query = '';
		results = [];
		resetLookup();
		void tick().then(() => inputEl?.focus());
	}

	async function loadHistory() {
		if (!hasConvex()) return;
		const ticket = ++historyLoad;
		const clientKey = getClientKey();
		try {
			const [queries, conversations] = await Promise.all([
				getConvex().query(api.conversations.listQueries, {
					clientKey,
					ids: storedQueryIds() as Id<'searchQueries'>[]
				}),
				getConvex().query(api.conversations.listConversations, {
					clientKey,
					ids: storedConversationIds() as Id<'conversations'>[]
				})
			]);
			if (ticket !== historyLoad) return;
			recentQueries = queries;
			recentConversations = conversations;
		} catch (error) {
			console.error(error);
		}
	}

	async function clearHistory() {
		historyLoad += 1;
		clearTimeout(saveQueryDebounce);
		recentQueries = [];
		recentConversations = [];
		conversationId = null;
		lastAssistantText = '';
		expectAssistant = false;
		clearStoredHistory();
		selected = 0;
		if (!hasConvex()) return;
		try {
			await getConvex().mutation(api.conversations.clearHistory, {
				clientKey: getClientKey()
			});
		} catch (error) {
			console.error(error);
		}
	}

	async function persistQuery(value: string) {
		if (!hasConvex() || value.trim().length < 2) return;
		try {
			const id = await getConvex().mutation(api.conversations.saveQuery, {
				clientKey: getClientKey(),
				query: value
			});
			rememberQueryId(id);
			await loadHistory();
		} catch (error) {
			console.error(error);
		}
	}

	async function searchNow(value: string) {
		if (!hasConvex() || value.trim().length < 2) {
			results = [];
			loading = false;
			return;
		}
		loading = true;
		try {
			results = collapsePageHits(
				(await getConvex().query(api.search.fullText, {
					query: value,
					limit: 16
				})) as SearchHit[]
			);
			selected = 0;
			clearTimeout(saveQueryDebounce);
			saveQueryDebounce = setTimeout(() => persistQuery(value), 900);
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}

	async function searchSemantic(value: string) {
		if (!hasConvex() || value.trim().length < 3) return;
		semanticLoading = true;
		try {
			const extra = (await getConvex().action(api.search.semantic, {
				query: value,
				limit: 8
			})) as SearchHit[];
			if (query.trim() === value.trim()) {
				results = mergeHits(results, extra);
			}
		} catch {
			// Semantic search needs OPENAI_API_KEY on Convex; keyword results still work.
		} finally {
			semanticLoading = false;
		}
	}

	function onQuery() {
		if (mode === 'chat') return;
		resetLookup();
		clearTimeout(debounce);
		clearTimeout(semanticDebounce);
		if (query.trim().length >= 2) loading = true;
		else {
			results = [];
			loading = false;
		}
		debounce = setTimeout(() => searchNow(query), 80);
		semanticDebounce = setTimeout(() => searchSemantic(query), 320);
	}

	function snippet(hit: SearchHit) {
		const prefix = hit.location ? `${hit.location} · ` : '';
		const text = hit.body.replace(/\s+/g, ' ').trim();
		const needle = query.trim().toLowerCase();
		const at = needle ? text.toLowerCase().indexOf(needle) : -1;
		if (at <= 0) return `${prefix}${text}`;
		return `${prefix}…${text.slice(at - 24)}`;
	}

	function isInternal(url: string) {
		return url.startsWith('/');
	}

	async function openHit(hit: SearchHit) {
		await persistQuery(query);
		close();
		if (isInternal(hit.url)) await goto(hit.url);
		else window.open(hit.url, '_blank', 'noopener,noreferrer');
	}

	function shortcutIndex(event: KeyboardEvent): number | null {
		const match = event.code.match(/^Digit([1-9])$/) ?? event.code.match(/^Numpad([1-9])$/);
		if (!match) return null;
		return Number(match[1]) - 1;
	}

	function rowClass(index: number, current: number) {
		return `result-row ${index === current ? 'is-active' : ''}`;
	}

	async function activateIndex(index: number) {
		if (mode === 'chat') return;
		if (query.trim().length < 2) {
			const item = homeItems[index];
			if (item) await openHomeItem(item);
			return;
		}
		const hit = flatResults(results)[index];
		if (hit) await openHit(hit);
	}

	async function openHomeItem(item: HomeItem) {
		if (item.type === 'query') {
			query = item.title;
			onQuery();
			await tick();
			inputEl?.focus();
			return;
		}
		await openConversation(item.id);
	}

	async function openConversation(id: string) {
		if (!hasConvex()) return;
		const row = await getConvex().query(api.conversations.getConversation, {
			clientKey: getClientKey(),
			conversationId: id as Id<'conversations'>
		});
		if (!row) return;
		conversationId = row._id;
		rememberConversationId(row._id);
		lastAssistantText = row.messages.filter((m) => m.role === 'assistant').at(-1)?.text ?? '';
		chat = new SiteChat(
			() => {
				chatTick += 1;
			},
			row.messages.map((message) => ({
				id: message._id,
				role: message.role,
				parts: [{ type: 'text', text: message.text }]
			}))
		);
		mode = 'chat';
		query = '';
		results = [];
		await tick();
		inputEl?.focus();
	}

	function messageText(message: UIMessage) {
		return message.parts
			.filter((part): part is { type: 'text'; text: string } => part.type === 'text')
			.map((part) => part.text)
			.join('\n')
			.trim();
	}

	async function ensureConversation(title: string) {
		if (conversationId) return conversationId;
		const id = await getConvex().mutation(api.conversations.createConversation, {
			clientKey: getClientKey(),
			title
		});
		conversationId = id;
		rememberConversationId(id);
		return id;
	}

	async function persistAssistant() {
		if (!hasConvex() || !conversationId || !chat) return;
		const assistant = [...chat.messages].reverse().find((message) => message.role === 'assistant');
		const text = assistant ? messageText(assistant) : '';
		if (!text || text === lastAssistantText) return;
		lastAssistantText = text;
		await getConvex().mutation(api.conversations.appendMessage, {
			clientKey: getClientKey(),
			conversationId: conversationId as Id<'conversations'>,
			role: 'assistant',
			text
		});
		await loadHistory();
	}

	async function submitChat(text: string) {
		if (!hasConvex() || !text.trim()) return;
		if (mode === 'lookup') startFreshChat();
		mode = 'chat';
		results = [];
		query = '';
		const id = await ensureConversation(text);
		await getConvex().mutation(api.conversations.appendMessage, {
			clientKey: getClientKey(),
			conversationId: id as Id<'conversations'>,
			role: 'user',
			text
		});
		rememberConversationId(id);
		expectAssistant = true;
		try {
			await chat?.sendMessage({ text });
		} catch (error) {
			console.error(error);
		}
	}

	async function submit() {
		if (mode === 'lookup' && query.trim().length < 2 && homeItems[selected]) {
			await openHomeItem(homeItems[selected]);
			return;
		}
		if (mode === 'lookup' && flatResults(results)[selected] && query.trim().length >= 2) {
			await openHit(flatResults(results)[selected]);
			return;
		}
		if (!query.trim()) return;
		const text = query;
		query = '';
		await submitChat(text);
	}

	function onKey(event: KeyboardEvent) {
		syncCmdHeld(event);
		if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
			event.preventDefault();
			if (query.trim()) void submitChat(query);
			return;
		}
		if (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey)) {
			event.preventDefault();
			moveSelection(1);
		} else if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
			event.preventDefault();
			moveSelection(-1);
		} else if (event.key === 'Enter') {
			event.preventDefault();
			void submit();
		}
	}

	function moveSelection(delta: number) {
		const list = activeList();
		if (!list.length) return;
		pointerNav = false;
		selected = (selected + delta + list.length) % list.length;
		void scrollSelected();
	}

	function selectWithPointer(index: number) {
		pointerNav = true;
		selected = index;
	}

	async function scrollSelected() {
		await tick();
		const row = listEl?.querySelector(`[data-result-index="${selected}"]`);
		if (row instanceof HTMLElement) {
			row.scrollIntoView({ block: 'nearest' });
		}
	}

	function useSuggestion(text: string) {
		query = text;
		onQuery();
	}

	function linkify(text: string) {
		const parts: { text: string; href?: string }[] = [];
		const re =
			/\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)|(https?:\/\/[^\s]+|\/(?:writing|film|projects|updates|QnA|about)[^\s]*)/g;
		let last = 0;
		let match: RegExpExecArray | null;
		while ((match = re.exec(text))) {
			if (match.index > last) parts.push({ text: text.slice(last, match.index) });
			parts.push({ text: match[1] ?? match[3] ?? match[0], href: match[2] ?? match[3] });
			last = match.index + match[0].length;
		}
		if (last < text.length) parts.push({ text: text.slice(last) });
		return parts.length ? parts : [{ text }];
	}

	function messageLinks(text: string) {
		const seen = new Set<string>();
		const links: { text: string; href: string }[] = [];
		for (const part of linkify(text)) {
			if (!part.href || seen.has(part.href)) continue;
			seen.add(part.href);
			links.push({ text: part.text, href: part.href });
		}
		return links;
	}

	async function openChatLink(href: string) {
		close();
		if (isInternal(href)) await goto(href);
		else window.open(href, '_blank', 'noopener,noreferrer');
	}

	function shortcutLabel(index: number) {
		if (index > 8) return '';
		return String(index + 1);
	}

	function kindIcon(kind: SearchHit['kind']) {
		switch (kind) {
			case 'writing':
				return Article;
			case 'update':
				return CalendarBlank;
			case 'project':
				return Cube;
			case 'bookmark':
				return BookmarkSimple;
			case 'photo':
				return Camera;
			case 'qa':
				return Question;
			case 'page':
				return FileText;
		}
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
		transition:fade={{ duration: 120 }}
	>
		<button class="absolute inset-0 bg-dark/70 backdrop-blur-sm" on:click={close} aria-label="Close search"
		></button>
		<div
			class="relative w-full max-w-xl overflow-hidden rounded-2xl border border-light/10 bg-[#1a1a1a] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
			in:fly={{ y: 12, duration: 180 }}
		>
			<div class="flex items-center gap-3 border-b border-light/10 px-4 py-3">
				<MagnifyingGlass size={18} class="shrink-0 opacity-50" />
				<input
					bind:this={inputEl}
					bind:value={query}
					on:input={onQuery}
					on:keydown={onKey}
					on:keyup={onGlobalKeyUp}
					placeholder={mode === 'chat' ? 'Ask a follow-up…' : 'Search writing, photos, projects…'}
					class="w-full bg-transparent text-[15px] outline-none placeholder:text-light/35"
				/>
				{#if mode === 'chat'}
					<button
						class="rounded-md p-1 text-light/45 hover:bg-light/10 hover:text-light"
						on:click={newConversation}
						aria-label="New conversation"
					>
						<Plus size={16} />
					</button>
				{/if}
				<kbd class="hidden rounded-md border border-light/15 px-1.5 py-0.5 text-[10px] text-light/40 sm:block"
					>esc</kbd
				>
			</div>

			{#if mode === 'lookup'}
				<div
					bind:this={listEl}
					class="max-h-[28rem] overflow-y-auto"
					class:pointer-nav={pointerNav}
					on:mousemove={() => (pointerNav = true)}
				>
					{#if query.trim().length < 2}
						{#if suggestions.length}
							<div class="px-4 pt-3 pb-2">
								<p class="mb-2 text-[11px] uppercase tracking-wide text-light/35">Try</p>
								<div class="flex flex-wrap gap-2">
									{#each suggestions as suggestion}
										<button
											class="rounded-full bg-light/5 px-3 py-1 text-sm text-light/70 hover:bg-light/10"
											on:click={() => useSuggestion(suggestion)}
										>
											{suggestion}
										</button>
									{/each}
								</div>
							</div>
						{/if}
						{#if !homeItems.length}
							<p class="px-4 py-6 text-sm text-light/40">Type to search, or press ⌘↵ to ask AI.</p>
						{:else}
							<div class="flex items-center justify-between px-4 pt-2 pb-1">
								<p class="text-[11px] uppercase tracking-wide text-light/35">Recent</p>
								<button
									class="text-[11px] text-light/40 hover:text-light/80"
									on:click={clearHistory}
								>
									Clear all
								</button>
							</div>
							{#each homeItems as item, index}
								<button
									data-result-index={index}
									class="{rowClass(index, selected)} py-2.5"
									on:mouseenter={() => selectWithPointer(index)}
									on:click={() => openHomeItem(item)}
								>
									<div
										class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-light/5 text-light/45"
									>
										{#if item.type === 'conversation'}
											<ChatCircle size={16} />
										{:else}
											<ClockCounterClockwise size={16} />
										{/if}
									</div>
									<div class="min-w-0 flex-1">
										<p class="fade-edge text-sm">{item.title}</p>
										<p class="fade-edge text-[11px] text-light/40">
											{item.type === 'conversation' ? 'Conversation' : 'Search'} · {formatAgo(
												item.at
											)}
										</p>
									</div>
									{#if index < 9}
										<kbd class="jump-key" class:visible={cmdHeld} aria-hidden="true"
											>{shortcutLabel(index)}</kbd
										>
									{/if}
								</button>
							{/each}
						{/if}
					{:else if !resultSections(results).length && !loading}
						<p class="px-4 py-8 text-center text-sm text-light/40">
							No matches. Press ↵ to ask AI, or ⌘↵ to force a chat.
						</p>
					{:else}
						{#each resultSections(results) as group}
							<div class="px-3 pt-3 pb-1 text-[11px] uppercase tracking-wide text-light/35">
								{group.label}
							</div>
							{#each group.items as hit}
								{@const index = flatResults(results).findIndex((row) => row.sourceId === hit.sourceId)}
								<button
									data-result-index={index}
									class="{rowClass(index, selected)} py-2"
									on:mouseenter={() => selectWithPointer(index)}
									on:click={() => openHit(hit)}
								>
									{#if hit.kind === 'photo' && (hit.thumbnailUrl || hit.imageUrl)}
										<img
											src={hit.thumbnailUrl || hit.imageUrl}
											alt=""
											class="h-10 w-10 shrink-0 rounded-md object-cover bg-light/10"
										/>
									{:else}
										<div
											class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-light/5 text-light/45"
										>
											<svelte:component this={kindIcon(hit.kind)} size={18} />
										</div>
									{/if}
									<div class="min-w-0 flex-1">
										<p class="fade-edge text-sm">{hit.title}</p>
										<p class="fade-edge text-xs text-light/45">{snippet(hit)}</p>
									</div>
									{#if index < 9}
										<kbd class="jump-key" class:visible={cmdHeld} aria-hidden="true"
											>{shortcutLabel(index)}</kbd
										>
									{/if}
								</button>
							{/each}
						{/each}
					{/if}
					{#if loading || semanticLoading}
						<p class="px-4 py-2 text-xs text-light/35">
							{semanticLoading ? 'Finding closer matches…' : 'Searching…'}
						</p>
					{/if}
				</div>
				<div
					class="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-light/10 px-3 py-2 text-[11px] text-light/35"
				>
					<span><kbd class="kbd">↵</kbd> Open</span>
					<span><kbd class="kbd">⌘↵</kbd> Ask AI</span>
					<span><kbd class="kbd">⌘1-9</kbd> Jump</span>
					<span><kbd class="kbd">↑↓</kbd> / <kbd class="kbd">tab</kbd> Navigate</span>
					<span><kbd class="kbd">⌘N</kbd> New</span>
				</div>
			{:else}
				<div class="max-h-[28rem] space-y-3 overflow-y-auto px-4 py-4">
					{#each chatMessages as message}
						{#if message.role === 'user' || messageText(message)}
						<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
							<div
								class="max-w-[90%] rounded-2xl px-3 py-2 text-sm {message.role === 'user'
									? 'bg-light/10'
									: 'bg-light/5'}"
							>
								{#each message.parts as part}
									{#if part.type === 'text'}
										<p class="whitespace-pre-wrap leading-relaxed">
											{#each linkify(part.text) as piece}
												{#if piece.href}
													<a
														href={piece.href}
														class="chat-link"
														target={piece.href.startsWith('/') ? undefined : '_blank'}
														rel="noreferrer"
														on:click|preventDefault={() => openChatLink(piece.href ?? '')}
														>{piece.text}</a
													>
												{:else}{piece.text}{/if}
											{/each}
										</p>
									{/if}
								{/each}
								{#if message.role === 'assistant' && messageLinks(messageText(message)).length}
									<div class="mt-2 flex flex-wrap gap-1.5">
										{#each messageLinks(messageText(message)) as link}
											<button class="chat-chip" on:click={() => openChatLink(link.href)}>
												{link.text}
											</button>
										{/each}
									</div>
								{/if}
							</div>
						</div>
						{/if}
					{/each}
					{#if thinkingVisible}
						<p class="thinking">Thinking</p>
					{:else if chatError}
						<p class="text-sm text-red-300/90">
							{chatErrorText(chatError)}
						</p>
					{/if}
				</div>
				<div
					class="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-light/10 px-3 py-2 text-[11px] text-light/35"
				>
					<span><kbd class="kbd">↵</kbd> Send</span>
					<span><kbd class="kbd">⌘N</kbd> New</span>
					<span><kbd class="kbd">esc</kbd> Back</span>
				</div>
			{/if}
		</div>
	</div>
{/if}

<button class="hidden" aria-hidden="true" on:click={show} data-open-search></button>

<style>
	:global(.kbd) {
		display: inline-block;
		margin-right: 0.2rem;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 0.3rem;
		padding: 0 0.3rem;
		font-size: 10px;
	}

	.result-row {
		--row-bg: #1a1a1a;
		position: relative;
		z-index: 0;
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.75rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		text-align: left;
	}

	.result-row:hover,
	.result-row.is-active {
		z-index: 20;
	}

	.pointer-nav .result-row:hover {
		--row-bg: #252525;
		background: rgba(255, 255, 255, 0.05);
	}

	.result-row.is-active {
		--row-bg: #313131;
		background: rgba(255, 255, 255, 0.1);
	}

	.result-row::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 20;
		width: 3.5rem;
		pointer-events: none;
		background: linear-gradient(to left, var(--row-bg) 28%, transparent);
	}

	.fade-edge {
		overflow: hidden;
		white-space: nowrap;
	}

	.jump-key {
		pointer-events: none;
		position: absolute;
		top: 50%;
		right: 0.75rem;
		z-index: 30;
		transform: translateY(-50%);
		border-radius: 0.25rem;
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: color-mix(in srgb, var(--row-bg) 88%, #000);
		padding: 0.125rem 0.4rem;
		font-size: 10px;
		line-height: 1.2;
		color: rgba(255, 255, 255, 0.55);
		opacity: 0;
		transition: opacity 140ms ease-out;
	}

	.jump-key.visible {
		opacity: 1;
		transition: opacity 50ms ease-out;
	}

	.thinking {
		padding-left: 0.15rem;
		font-size: 13px;
		color: rgba(255, 255, 255, 0.45);
		animation: think 2.4s ease-in-out infinite;
	}

	@keyframes think {
		0%,
		100% {
			opacity: 0.22;
		}
		50% {
			opacity: 0.8;
		}
	}

	:global(.chat-link) {
		text-decoration: underline;
		text-underline-offset: 3px;
		padding: 0 0.05rem;
	}

	:global(.chat-link:hover) {
		text-underline-offset: 5px;
	}

	.chat-chip {
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.06);
		padding: 0.2rem 0.6rem;
		font-size: 12px;
		color: rgba(255, 255, 255, 0.75);
	}

	.chat-chip:hover {
		background: rgba(255, 255, 255, 0.12);
	}
</style>
