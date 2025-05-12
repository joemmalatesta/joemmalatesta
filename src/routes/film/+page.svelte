<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Header from '../../components/Heading.svelte';
	import FilmRoll from './FilmRoll.svelte';
	import FilmHolder from './FilmHolder.svelte';
	import FilmCanister from './FilmCanister.svelte';
	import { filmImages, type FilmImage } from '$lib/film';
	import MapPin from 'phosphor-svelte/lib/MapPin';
	import FilmStackMobile from './FilmStackMobile.svelte';
	let ready = false;
	onMount(() => {
		ready = true;
	});

	const filmCategories = ['Asia', '2022', '2024'];
	let activeCategory = '2024';
	let hoveredImage: FilmImage | null = null;
	function setActiveCategory(category: string) {
		activeCategory = category;
	}
</script>

<main class="min-h-screen">
	{#if ready}
		<section class="gap-1 py-5" transition:fly={{ y: 50, duration: 400, delay: 0 }}>
			<Header
				title="Film Gallery"
				description="I've got a film camera. I take pictures when I remember it."
			/>
		</section>
		<section class="gap-1 relative" transition:fly={{ y: 50, duration: 400, delay: 200 }}>
			<!-- Show only the active FilmRoll -->
			<div class="my-10">
				{#key activeCategory}
					<FilmRoll folder={activeCategory} bind:hoveredImage />
				{/key}
			</div>
		</section>
		<!-- Show the other categories as canisters in the holder -->
		<div class="flex gap-5">
			{#each filmCategories.filter((c) => c !== activeCategory) as category}
				<button on:click={() => setActiveCategory(category)}>
					<FilmHolder label={category}>
						<FilmCanister title={category} />
					</FilmHolder>
				</button>
			{/each}
			<!-- Image selected -->
			{#if hoveredImage}
				<div class="w-1/2 flex justify-center items-start">
					<div
						class="bg-neutral-900/90 p-4 rounded-xl shadow-2xl border border-neutral-700 flex flex-col items-center max-w-md"
					>
						<img
							src={hoveredImage.source}
							alt="Selected Film"
							class="border-8 border-white shadow-xl rounded-md -rotate-2 mb-3 max-w-full h-auto transition-transform duration-300 hover:rotate-1"
						/>
						<div
							class="bg-neutral-800/80 px-4 py-2 rounded-b-md w-full text-center mt-1 shadow text-gray-200 font-mono text-base"
						>
							<h3 class="font-bold text-lg mb-1">{hoveredImage.description}</h3>
							<div class="flex gap-1 justify-center items-center">
								<MapPin size={16} />
								<p class="text-xs italic">{hoveredImage.location}</p>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="flex gap-5">
			<FilmStackMobile folder="Asia" />
		</div>
	{/if}
</main>
