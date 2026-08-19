<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';
	import Book from '../Book.svelte';
	import { formatBookDate } from '$lib/books';

	let ready = false;
	let bookOpen = false;

	onMount(() => {
		ready = true;
	});

	export let data: PageData;
	$: book = data.book;
</script>

<svelte:head>
	<title>{book.title} - Library - JMM</title>
	<meta name="description" content={book.thoughts.slice(0, 160)} />
	<link
		href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="min-h-[80vh] w-full pb-10">
	{#if ready}
		<header in:fly={{ y: 50, duration: 400, delay: 0 }} class="pt-10 pb-8 md:pb-10">
			<p class="text-base sm:text-lg opacity-70">
				{book.author}<span class="px-2 opacity-40">|</span><span class="opacity-60"
					>{formatBookDate(book.dateRead)}</span
				>
			</p>
			<h1 class="text-4xl sm:text-5xl font-semibold mt-2">{book.title}</h1>
		</header>

		<div class="md:flex md:gap-10 lg:gap-16 md:items-start">
			<div class="flex justify-center scale-75 sm:scale-100 mb-8 md:mb-0 md:w-2/5 shrink-0 md:sticky md:top-24">
				<Book
					{book}
					mode="detail"
					size="xl"
					mobileOpen={bookOpen}
					on:toggle={() => (bookOpen = !bookOpen)}
				/>
			</div>

			<article
				in:fly={{ y: 50, duration: 400, delay: 200 }}
				class="md:w-3/5 opacity-90 text-[.95rem] leading-relaxed whitespace-pre-line"
			>
				{book.thoughts}
			</article>
		</div>
	{/if}
</main>
