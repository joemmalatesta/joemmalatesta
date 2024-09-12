<script lang="ts">
	import DrawingCanvas from './DrawingCanvas.svelte';
	import Header from '../../components/Heading.svelte';

	import { onMount } from 'svelte';
	import type { trainingData } from '$lib/types';
	import VoteCard from './VoteCard.svelte';
	import { fly } from 'svelte/transition';
	export let data: { undecidedData: trainingData[] | [] };

	let ready = false;
	onMount(() => {
		ready = true;
	});

	// TODO: add toast when vote is counted or drawing is submitted.
</script>

<main class="min-h-screen">
	{#if ready}
		<div class="flex flex-col">
			<div class="flex flex-col gap-2 mb-5" in:fly={{ y: 50, duration: 600, delay: 0 }}>
				<Header title="Training" description="Crowdsourcing the training data for my vision model..." />
				<p class="opacity-70">Each day the model will be trained on the images you vote on over a single epoch.</p>
			</div>
			<div in:fly={{ y: 50, duration: 600, delay: 200 }}>
				<DrawingCanvas />
			</div>
			<section class="mt-10" in:fly={{ y: 50, duration: 600, delay: 400 }}>
				<h3 class="text-4xl font-semibold">Vote</h3>
				<p class="opacity-70">Help decide what my model should be trained on</p>
				<div class="mt-5 grid grid-cols-3 gap-4" >
					{#each data.undecidedData as item}
						<VoteCard data={item} />
					{:else}
						<p class="opacity-70">No Images to vote on currently</p>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</main>
