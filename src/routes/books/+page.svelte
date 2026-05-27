<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Book from './Book.svelte';
	import { books, formatBookDate } from '$lib/books';

	let ready = false;
	let hoveredIndex: number | null = null;

	onMount(() => {
		ready = true;
	});
</script>

<svelte:head>
	<title>Library - JMM</title>
	<meta name="description" content="Books I've read and what I took from them" />
	<link
		href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="min-h-screen">
	{#if ready}
		<div in:fly={{ y: 50, duration: 600, delay: 0 }} class="flex flex-col pt-10 mb-5 gap-2">
			<h1 class="text-5xl sm:text-6xl font-semibold">Library</h1>
			<p class="opacity-70">Books I've read and what I took from them</p>
		</div>

		<div class="flex flex-col" in:fly={{ y: 50, duration: 400, delay: 200 }}>
			{#each books as book, i}
				<a
					href="/books/{book.slug}"
					class="group flex items-center gap-4 sm:gap-6 w-full border-b border-light/40 py-4 md:py-5 opacity-60 hover:opacity-100 transition-all"
					on:mouseenter={() => (hoveredIndex = i)}
					on:mouseleave={() => (hoveredIndex = null)}
				>
					<div class="shrink-0 pointer-events-none">
						<Book {book} mode="list" size="sm" hovered={hoveredIndex === i} />
					</div>

					<div class="flex-1 min-w-0">
						<h4 class="text-lg md:text-xl truncate">{book.title}</h4>
						<p class="text-sm opacity-60 truncate">
							{book.author}<span class="px-2 opacity-40">|</span>{formatBookDate(book.dateRead)}
						</p>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</main>
