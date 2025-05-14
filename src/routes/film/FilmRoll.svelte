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
	<section transition:fly={{ y: 50, duration: 400, delay: 200 }}>
		<div class="canister-container w-fit">
			<FilmCanister title={folder} />
		</div>
		<div class="film-roll">
			<ul>
				{#each images as picture, index}
					<li>
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div
							class="film-container {index === images.length - 1
								? 'border-b-0'
								: 'border-b-8'} border-neutral-950 border-x-[12px]"
							on:mouseenter={() => (hoveredImage = picture)}
							on:mouseleave={() => (hoveredImage = null)}
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
		transform: translatey(-60%);
		transition: all 1s;
		height: auto;
		width: 220px;
		display: flex;
		flex-direction: column;
	}

	.film-container {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		cursor: pointer;
	}

	.film-container::before {
		content: "";
		position: absolute;
		left: 20px;
		width: 8px;
		height: 8px;
		background: #5e5e5e;
		box-shadow: 14px 0px 0px #5e5e5e, 28px 0px 0px #5e5e5e, 42px 0px 0px #5e5e5e, 56px 0px 0px #5e5e5e, 70px 0px 0px #5e5e5e, 84px 0px 0px #5e5e5e, 98px 0px 0px #5e5e5e, 112px 0px 0px #5e5e5e, 126px 0px 0px #5e5e5e, 140px 0px 0px #5e5e5e, 154px 0px 0px #5e5e5e, 168px 0px 0px #5e5e5e, 182px 0px 0px #5e5e5e, 196px 0px 0px #5e5e5e, 210px 0px 0px #5e5e5e, 224px 0px 0px #5e5e5e, 238px 0px 0px #5e5e5e, 252px 0px 0px #5e5e5e, 266px 0px 0px #5e5e5e, 280px 0px 0px #5e5e5e, 294px 0px 0px #5e5e5e, 308px 0px 0px #5e5e5e;
	}

	.film-container::after {
		content: "";
		position: absolute;
		bottom: 4px;
		left: 0px;
		width: 8px;
		height: 8px;
		background: #5e5e5e;
		box-shadow: 14px 0px 0px #5e5e5e, 28px 0px 0px #5e5e5e, 42px 0px 0px #5e5e5e, 56px 0px 0px #5e5e5e, 70px 0px 0px #5e5e5e, 84px 0px 0px #5e5e5e, 98px 0px 0px #5e5e5e, 112px 0px 0px #5e5e5e, 126px 0px 0px #5e5e5e, 140px 0px 0px #5e5e5e, 154px 0px 0px #5e5e5e, 168px 0px 0px #5e5e5e, 182px 0px 0px #5e5e5e, 196px 0px 0px #5e5e5e, 210px 0px 0px #5e5e5e, 224px 0px 0px #5e5e5e, 238px 0px 0px #5e5e5e, 252px 0px 0px #5e5e5e, 266px 0px 0px #5e5e5e, 280px 0px 0px #5e5e5e, 294px 0px 0px #5e5e5e, 308px 0px 0px #5e5e5e;
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
