<script lang="ts">
	import Bookmark from './Bookmark.svelte';
	import GradientBox from '../../components/GradientBox.svelte';
	import PhotoBook from './PhotoBook.svelte';
	import Header from '../../components/Heading.svelte';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { bookmarks } from '../../lib/bookmarks';
	let ready = false;
	onMount(() => {
		ready = true;
	});

	let smallScreen: boolean;
	let activePicture = 0;
	let pictureText: string;
	$: switch (activePicture) {
		case 0:
			pictureText = 'spent a summer exploring San Francisco.';
			break;
		case 1:
			pictureText = 'have been practicing hand stands for the last 2 years.';
			break;
		case 2:
			pictureText = 'rebooted and ran my schools hackathon from 2023-2025.';
			break;
		case 3:
			pictureText = 'want to see all the world has to offer.';
			break;
	}

	// Bookmark section
	let bookmarkType = 'people';

	// Extras section
	type Extras = {
		title: string;
		href: string;
	};
	let extras: Extras[] = [
		{
			title: 'Film Gallery',
			href: 'film'
		},
		{
			title: 'Q&A',
			href: '/QnA'
		},
	];
</script>

<svelte:head>
	<title>About - JMM</title>
	<meta name="description" content="A closer look at who I am and aspire to be" />
</svelte:head>

<main class="min-h-screen overflow-x-hidden sm:overflow-visible">
	{#if ready}
		<section transition:fly={{ y: 50, duration: 600, delay: 0 }}>
			<Header title="About" description="A closer look at who I am and aspire to be" />
		</section>

		<section
			transition:fly={{ y: 50, duration: 400, delay: 200 }}
			class=" flex flex-col md:flex-row justify-between relative w-full md:gap-24 gap-12 pt-24 md:pt-32 py-10"
		>
			<div class="z-50 mx-auto flex justify-center items-center lg:-translate-x-20 sm:mb-10">
				<PhotoBook bind:activePicture bind:smallScreen />
			</div>
			<div
				class="opacity-90 text-[.95rem] gap-4 sm:gap-6 pt-5 md:pt-0 flex flex-col sm:w-1/2 w-full"
			>
				Hey, I'm Joe 😸
				<p>
					I'm a product focused developer passionate about simplifying user interactions and
					building communities of engineers.
				</p>
				<p>
					As much as I love rotting in front of a screen, my childhood was 100% outdoors and you'll
					still catch me traveling, surfing, and playing tennis any chance I get.
				</p>
				<p>
					Oh, and I also {#key activePicture}<span
							out:fade={{ duration: 200 }}
							in:fade={{ delay: smallScreen ? 400 : 300, duration: 200 }}
							class="">{pictureText}</span
						>{/key}
				</p>
			</div>
		</section>

		<!-- Tools, Design, Tech, Portfolio Inspiration -->
		<section class="py-10" transition:fly={{ y: 50, duration: 400, delay: 400 }}>
			<div class="gap-1">
				<h3 class="text-4xl font-semibold">Bookmarks</h3>
				<p class="opacity-70">Useful tools and inspiring people</p>
				<div class="gap-2 flex py-2">
					{#each ['people', 'tools'] as type}
						<button
							on:click={() => {
								bookmarkType = type;
							}}
							class="text-sm hover:opacity-100 rounded p-1 px-3 bg-light/10 {bookmarkType === type
								? 'opacity-100'
								: ' opacity-60'}">{type}</button
						>
					{/each}
				</div>

				{#key bookmarkType}
					<div class="flex flex-wrap gap-2 py-2">
						{#each bookmarks as bookmark}
							{#if bookmark.type === bookmarkType}
								<Bookmark {bookmark} />
							{/if}
						{/each}
					</div>
				{/key}
			</div>
		</section>

		<!-- Extras section -->
		<section class="gap-1 py-10" transition:fly={{ y: 50, duration: 400, delay: 600 }}>
			<h3 class="text-4xl font-semibold">Extras</h3>
			<p class="opacity-70">Check out these other things I do (more coming soon)</p>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full py-4">
				{#each extras as extra}
					<GradientBox title={extra.title} href={extra.href} />
				{/each}
			</div>
		</section>
	{/if}
</main>
