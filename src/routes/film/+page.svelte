<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
    import Header from '../../components/Heading.svelte';
    let ready = false;
	onMount(() => {
		ready = true;
	});
	interface Picture {
		title: string;
		description?: string;
		image: string;
	}
	let selectedImage: number | null = null;
	let pictures: Picture[] = [{
		title: 'birthday',
		description: 'My 20th Birthday',
		image: 'birthday.webp'
	}, {
		title: 'brown',
		image: 'brown.webp'
	}, {
		title: 'camerastore',
		description: 'Camera store',
		image: 'camerastore.webp'
	}, {
		title: 'concert',
		description: 'Concert',
		image: 'concert.webp'
	}, {
		title: 'dancy',
		description: 'Dancy',
		image: 'dancy.webp'
	}, {
		title: 'fishpic',
		description: 'Fish',
		image: 'fishpic.webp'
	}, {
		title: 'grossy',
		description: 'Grossy',
		image: 'grossy.webp'
	}, {
		title: 'mother',
		description: 'Mother',
		image: 'mother.webp'
	}, {
		title: 'summercamp',
		description: 'Summer camp',
		image: 'summercamp.webp'
	}];
</script>

<!-- SECTION FOR FILM PHOTOGRAPHY -->
<!-- todo: update with new scans when done -->
 <!-- todo: make clickable with info on the back -->
<main class="min-h-screen">
{#if ready}
<section class="gap-1 py-5" transition:fly={{ y: 50, duration: 400, delay: 0 }}>
	<Header title="Film Gallery" description="I've got a film camera. I take pictures when I remember it." />
    </section>
    <section class="gap-1" transition:fly={{ y: 50, duration: 400, delay: 200 }}>
	<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full py-2" transition:fly={{ y: 50, duration: 400, delay: 200 }}>
		{#each pictures as picture}
			<div class="relative overflow-hidden rounded-lg ring-2 ring-light/10 h-40 group">
				<img
					class="w-full h-40 object-cover transition-transform duration-300 "
					loading="lazy"
					src="photography/{picture.image}"
					alt="film"
				/>
				{#if picture.description}
				<div class="absolute bottom-0 left-0 right-0 bg-dark/60 text-light p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<!-- Add your image info here -->
					<p>{picture.description}</p>
				</div>
				{/if}
			</div>
		{/each}
	</div>
	</section>
	{/if}
</main>
