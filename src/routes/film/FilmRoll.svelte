<script lang="ts">
	import { fly } from 'svelte/transition';
	import FilmCanister from './FilmCanister.svelte';
	import { onMount } from 'svelte';
	import { filmImages, type FilmImage } from '$lib/film';

	export let folder: string;
	let images: FilmImage[] = filmImages.filter((image) => image.category === folder);

	let ready = false;
	onMount(() => {
		ready = true;
	});
	let loadedImages: { [key: string]: boolean } = {};
	function handleImageLoad(picture: string) {
		loadedImages[picture] = true;
	}
	export let hoveredImage: FilmImage | null = null;
</script>

{#if ready}
	<section class="gap-1 relative" transition:fly={{ y: 50, duration: 400, delay: 200 }}>
		<FilmCanister title={folder} />
		<div class="film-roll">
			<ul>
				{#each images as picture}
					<li>
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="film-container"
							on:mouseenter={() => (hoveredImage = picture)}
							on:mouseleave={() => (hoveredImage = null)}
						>
							<div class="placeholder {!loadedImages[picture.source] ? 'animate-pulse' : ''}"></div>
							<img
								loading="lazy"
								src={picture.source}
								alt="film"
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
	.film-roll {
		position: absolute;
		top: 35px;
		left: 130px;
		width: 80px;
		overflow: auto;
		overflow: hidden;
		transition: all 0.5s ease-in-out;
		z-index: 30;
	}
	.film-roll:hover {
		width: 50vw;
		overflow-x: scroll;
	}
	.film-roll:hover ul {
		transform: translatex(0px);
	}
	ul {
		transform: translatex(-70%);
		transition: all 1s;
		width: auto;
		height: 166px;
		padding: 0;
		margin: 0;
		list-style: none;
		border-style: solid;
		border-width: 17px 0px;
		border-image: url(https://i.imgur.com/Sm9CNai.png) 27 fill repeat stretch;
		display: flex;
		flex-direction: row;
	}
	ul li {
		display: block;
		width: 160px;
		height: 160px;
		margin: 3px 10px;
		background: #000;
		flex-shrink: 0;
		position: relative;
	}
	.film-container {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		cursor: pointer;
	}
	.placeholder {
		position: absolute;
		inset: 0;
		background-color: rgba(255, 255, 255, 0.05);
		z-index: 0;
	}
	.film-negative {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: invert(1) hue-rotate(180deg) brightness(0.5) contrast(1.5) sepia(0.4);
		position: relative;
		z-index: 10;
		transition: all 0.3s ease-in-out;
	}
	.film-container:hover .film-negative {
		filter: none;
		transform: scale(1.05);
	}
	.film-container:hover .spotlight-overlay {
		opacity: 1;
	}
	.film-container::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 8px;
		background: repeating-linear-gradient(
			to bottom,
			transparent,
			transparent 4px,
			rgba(0, 0, 0, 0.5) 4px,
			rgba(0, 0, 0, 0.5) 8px
		);
		z-index: 15;
		opacity: 0.7;
		pointer-events: none;
	}
	.film-container::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		width: 8px;
		background: repeating-linear-gradient(
			to bottom,
			transparent,
			transparent 4px,
			rgba(0, 0, 0, 0.5) 4px,
			rgba(0, 0, 0, 0.5) 8px
		);
		z-index: 15;
		opacity: 0.7;
		pointer-events: none;
	}
</style>
