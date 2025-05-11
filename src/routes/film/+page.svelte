<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Header from '../../components/Heading.svelte';
	import FilmRoll from './FilmRoll.svelte';
	import type { PageData } from './$types';
	let ready = false;
	onMount(() => {
		ready = true;
	});

    export let data: PageData;
    const { images } = data as { images: string[] };

	// Array of film images to display
	const filmCategories = [
		'Asia',
		'2022',
		'2023',
		'2024'
	];
</script>

<!-- SECTION FOR FILM PHOTOGRAPHY -->
<main class="min-h-screen">
	{#if ready}
		<section class="gap-1 py-5" transition:fly={{ y: 50, duration: 400, delay: 0 }}>
			<Header
				title="Film Gallery"
				description="I've got a film camera. I take pictures when I remember it."
			/>
		</section>
		<section class="gap-1 relative" transition:fly={{ y: 50, duration: 400, delay: 200 }}>
			{#each filmCategories as category}
				<div class="my-10">
					<FilmRoll folder={category} />
				</div>
			{/each}
		</section>
	{/if}
</main>
