<script lang="ts">
	import type { Post } from '$lib/posts';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import { fly } from 'svelte/transition';
	import { highlight } from '$lib/syntaxHighlighting';
	let ready = false;
	onMount(() => {
		ready = true;
	});

	export let data: PageData;
	const { metadata, post: Post } = data as { metadata: Post['metadata']; post: Post['default'] };
</script>

<main class="min-h-screen w-full mx-auto">
	{#if ready}
		<article class="prose lg:prose-lg prose-invert">
			<div in:fly={{ y: 50, duration: 400, delay: 0 }} class="flex flex-col">
				<p class="text-sm text-light/60">{metadata.pubDate}</p>
				<h1>{metadata.title}</h1>
			</div>
			<div in:fly={{ y: 50, duration: 400, delay: 200 }} class="max-w-full mx-auto">
				<Post />
			</div>
		</article>
	{/if}
</main>

<style>
	:global(pre) {
		max-width: 100%;
		overflow-x: auto;
		white-space: pre-wrap;
		word-wrap: break-word;
	}
	
	:global(code) {
		white-space: pre;
	}
</style>
