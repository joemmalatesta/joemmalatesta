<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import { fly } from 'svelte/transition';
	let ready = false;
	onMount(() => {
		ready = true;
	});

	export let data: PageData;
	const { allPostInfo } = data as { allPostInfo: any[] };

	// Sort allPostInfo by date in descending order (newest first)
	const sortedPosts = allPostInfo.sort(
		(a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf()
	);
</script>

<svelte:head>
	<title>Writing - JMM</title>
	<meta name="description" content="Infrequent recounts of times I got better at coding" />
</svelte:head>

<main class="min-h-screen">
	{#if ready}
		<div in:fly={{ y: 50, duration: 600, delay: 0 }} class="flex flex-col pt-10 mb-5 gap-2">
			<h1 class="text-5xl sm:text-6xl font-semibold">Writing</h1>
			<p class="opacity-70">Infrequent recounts of times I got better at coding. I write personal stuff at <a
					href="https://ifnotnow.tw"
					target="_blank"
					class="underline transition-all hover:underline-offset-4 underline-offset-2"
					>ifnotnow.tw</a
				></p>
		</div>

		<div class="flex flex-col" in:fly={{ y: 50, duration: 400, delay: 200 }}>
			{#each sortedPosts as post, index}
			<a
			class="flex justify-between items-center w-full border-b border-light/40 py-2 xl:py-3 opacity-70 md:opacity-50 md:hover:opacity-100 transition-all"
			target={post.external ? "_blank" : ""}
			href={post.external ? post.url : `/writing/${post.slug}/`}
		>
		<div class="flex gap-1 items-center sm:w-5/6 w-full">
			<h4 class="text-lg md:text-xl truncate">{post.title}</h4>
			{#if post.external}
				<img src="icons/outlink.svg" class="w-4 lg:w-5 h-4 lg:h-5" alt="external link" />
			{/if}
		</div>
			
			<div class="sm:text-sm text-xs flex gap-2 items-center">
				<p class="hidden sm:block">
					{new Date(post.pubDate).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}
				</p>
				
				<!-- <img src="icons/arrow-right.svg" class="w-6 h-6 group-hover:translate-x-2 transition-all duration-300" alt="arrow right" /> -->
			</div>
			
		</a>
			{/each}
		</div>
	{/if}
</main>
