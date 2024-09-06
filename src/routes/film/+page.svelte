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
<section class="gap-1 py-5" transition:fly={{ y: 50, duration: 400, delay: 0 }}>
	<Header title="Film Gallery" description="I've got a film camera. I take pictures when I remember it." />
    </section>
    <section class="gap-1" transition:fly={{ y: 50, duration: 400, delay: 200 }}>
	<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full py-2" transition:fly={{ y: 50, duration: 400, delay: 200 }}>
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
