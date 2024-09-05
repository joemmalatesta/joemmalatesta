<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
    import Header from '../../components/Heading.svelte';
    let ready = false;
	onMount(() => {
		ready = true;
	});


</script>

<!-- SECTION FOR FILM PHOTOGRAPHY -->
<!-- todo: update with new scans when done -->
<main class="min-h-screen">
{#if ready}
<section class="gap-1 py-10" transition:fly={{ y: 50, duration: 400, delay: 0 }}>
	<Header title="Fitness" description="You won't find a Strava account around here." />
    <!-- Working toward -->
     <!-- Milestones -->
      <!-- Current goals -->
	<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full py-2">
		{#each ['birthday', 'brown', 'camerastore', 'concert', 'dancy', 'fishpic', 'grossy', 'mother', 'summercamp'] as picture}
			<img
				loading="lazy"
				src="photography/{picture}.webp"
				alt="film"
				class="w-full h-40 object-cover rounded-lg ring-2 ring-light/10"
			/>
		{/each}
			</div>
		</section>
	{/if}
</main>
