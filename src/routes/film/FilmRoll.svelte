<script lang="ts">
	import { fly } from 'svelte/transition';
	import FilmCanister from './FilmCanister.svelte';
	import { onMount } from 'svelte';
	import { filmImages, type FilmImage } from '$lib/film';

	export let folder: string;
	let images: FilmImage[] = filmImages.filter((image) => image.category === folder);
	let hasBeenHovered = false;
	$: console.log(hasBeenHovered);

	let ready = false;
	onMount(() => {
		ready = true;
	});
	let loadedImages: { [key: string]: boolean } = {};
	function handleImageLoad(picture: string) {
		loadedImages[picture] = true;
	}
	export let hoveredImage: FilmImage | null = null;
	export let stickyImage: FilmImage | null = null;
</script>

{#if ready}
	<section transition:fly={{ y: 50, duration: 400, delay: 200 }}>
		<div class="canister-container w-fit">
			<FilmCanister title={folder} />
		</div>
		<div class="film-roll">
			<ul class={hasBeenHovered ? '-translate-y-[20%]' : '-translate-y-[60%]'}>
				{#each images as picture, index}
					<li>
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="film-container border-b-8 border-black border-x-4"
							on:mouseenter={() => {
								hasBeenHovered = true;
								hoveredImage = picture;
							}}
							on:mouseleave={() => {
								hoveredImage = null;
							}}
							on:click={() => {
								stickyImage = picture;
								hoveredImage = null; // Clear hover state when clicking
							}}
						>
							<div class="placeholder {!loadedImages[picture.source] ? 'animate-pulse' : ''}"></div>
							<img
								loading="lazy"
								src={picture.source}
								alt={picture.description}
								on:load={() => handleImageLoad(picture.source)}
								class="film-negative"
							/>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

<style>
	.canister-container {
		transform: rotate(-90deg);
		position: relative;
		left: 45px;
		top: 65px;
		z-index: 100;
	}
	.film-roll {
		position: absolute;
		height: 80px;
		min-height: 80px;
		overflow: auto;
		overflow: hidden;
		/* hide scrollbar */
		scrollbar-width: none;
		-ms-overflow-style: none;
		transition: all 0.5s ease-in-out;
		z-index: 30;
	}
	.film-roll:hover {
		height: 60vh;
		overflow-y: scroll;
	}
	.film-roll:hover ul {
		transform: translatey(0px);
	}
	ul {
		min-height: 80px;
		transition: all 1s;
		height: auto;
		width: 220px;
		display: flex;
		flex-direction: column;
		border-style: solid;
		border-width: 0px 17px;
		-moz-border-image: url(https://i.imgur.com/oOf93Qm.png) 20 repeat;
		-webkit-border-image: url(https://i.imgur.com/oOf93Qm.png) 20 repeat;
		-o-border-image: url(https://i.imgur.com/oOf93Qm.png) 20 repeat;
		border-image: url(https://i.imgur.com/oOf93Qm.png) 20 repeat;
	}

	.film-container {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		cursor: pointer;
	}

	.film-negative {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: invert(1) hue-rotate(180deg) brightness(0.5) contrast(1.5) sepia(0.7);
		position: relative;
		z-index: 10;
		transition: all 0.3s ease-in-out;
	}
	.film-container:hover .film-negative {
		filter: none;
		transform: scale(1.05);
	}
</style>
