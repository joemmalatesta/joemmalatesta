<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Book from './Book.svelte';
	import Paper from './Paper.svelte';
	import { reading, formatReadingDate } from '$lib/reading';

	let ready = false;
	let hoveredIndex: number | null = null;

	onMount(() => {
		ready = true;
	});
</script>

<svelte:head>
	<title>Reading - JMM</title>
	<meta name="description" content="Books and essays I've been reading" />
</svelte:head>

<main class="min-h-screen">
	{#if ready}
		<div in:fly={{ y: 50, duration: 600, delay: 0 }} class="flex flex-col pt-10 mb-5 gap-2">
			<h1 class="text-5xl sm:text-6xl font-semibold">Reading</h1>
			<p class="opacity-70">Books and essays I keep coming back to</p>
		</div>

		<div class="flex flex-col" in:fly={{ y: 50, duration: 400, delay: 200 }}>
			{#each reading as item, i}
				<a
					href={item.href}
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-4 sm:gap-6 w-full border-b border-light/40 py-4 md:py-5 opacity-60 hover:opacity-100 transition-all"
					on:mouseenter={() => (hoveredIndex = i)}
					on:mouseleave={() => (hoveredIndex = null)}
				>
					<div class="shrink-0 pointer-events-none">
						{#if item.kind === 'book'}
							<Book {item} hovered={hoveredIndex === i} />
						{:else}
							<Paper {item} hovered={hoveredIndex === i} />
						{/if}
					</div>

					<div class="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-8">
						<div class="min-w-0 {item.note ? 'sm:max-w-[46%] sm:shrink-0' : ''}">
							<h4 class="text-lg md:text-xl truncate">{item.title}</h4>
							<p class="text-sm opacity-60 truncate">
								{item.byline}{#if item.date}<span class="px-2 opacity-40">|</span
									>{formatReadingDate(item.date)}{/if}
							</p>
						</div>

						{#if item.note}
							<p
								class="text-sm leading-snug italic opacity-55 line-clamp-2 sm:flex-1 sm:opacity-0 sm:translate-x-1 sm:group-hover:opacity-70 sm:group-hover:translate-x-0 transition-all duration-300"
							>
								{item.note}
							</p>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
</main>
