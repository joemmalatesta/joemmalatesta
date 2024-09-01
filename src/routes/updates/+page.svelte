<script lang="ts">
	import { updates } from '$lib/timeline';
	import Timeline from '../../components/Timeline.svelte';

	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	let ready = false;
	onMount(() => {
		ready = true;
	});

	let activePicture = 0;
</script>

<main class="min-h-screen">
	{#if ready}
		<section transition:fly={{ y: 50, duration: 400, delay: 0 }}>
			<h1 class="text-6xl font-semibold">Updates</h1>
			<p class="opacity-70">Curious to see what I've been up to?</p>
		</section>

		<section
			transition:fly={{ y: 50, duration: 400, delay: 200 }}
			class="flex justify-between relative w-full gap-5 py-5"
		>
			<div class="w-full z-50 mx-auto justify-center items-center">
				{#each updates as update, index}
					<Timeline {update} {index} isLast={false} initialLoad={index === 0} />
				{/each}
			</div>
		</section>
	{/if}
</main>
