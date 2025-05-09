<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Header from '../../components/Heading.svelte';
	let ready = false;
	onMount(() => {
		ready = true;
	});
	let loadedImages: { [key: string]: boolean } = {};
	function handleImageLoad(picture: string) {
		loadedImages[picture] = true;
	}
</script>

<!-- SECTION FOR FILM PHOTOGRAPHY -->
<!-- todo: update with new scans when done -->
 <!-- todo: make clickable with info on the back -->
<main class="min-h-screen">
	{#if ready}
		<section class="gap-1 py-5" transition:fly={{ y: 50, duration: 400, delay: 0 }}>
			<Header
				title="Film Gallery"
				description="I've got a film camera. I take pictures when I remember it."
			/>
		</section>
		<section class="gap-1" transition:fly={{ y: 50, duration: 400, delay: 200 }}>
			<div
				class="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full py-2"
				transition:fly={{ y: 50, duration: 400, delay: 200 }}
			>
				{#each ['birthday', 'brown', 'camerastore', 'concert', 'dancy', 'fishpic', 'grossy', 'mother', 'summercamp'] as picture}
					<div class="relative w-full h-40">
						<div
							class="absolute inset-0 bg-light/5 rounded-lg ring-2 ring-light/10 z-0 {!loadedImages[
								picture
							]
								? 'animate-pulse'
								: ''}"
						></div>
						<img
							loading="lazy"
							src="photography/{picture}.webp"
							alt="film"
							on:load={() => handleImageLoad(picture)}
							class="w-full h-full object-cover rounded-lg ring-2 ring-light/10 relative z-10"
						/>
					</div>
				{/each}
			</div>
		</section>
	{/if}
	<!-- TODO: make a skeleton loading state with {:else} -->
</main>
