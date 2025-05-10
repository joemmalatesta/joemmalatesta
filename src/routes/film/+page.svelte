<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Header from '../../components/Heading.svelte';
	import FilmCanister from './FilmCanister.svelte';

	let ready = false;
	onMount(() => {
		ready = true;
	});
	let loadedImages: { [key: string]: boolean } = {};
	function handleImageLoad(picture: string) {
		loadedImages[picture] = true;
	}

	// Array of film images to display
	const filmPictures = [
		'birthday',
		'brown',
		'camerastore',
		'concert',
		'dancy',
		'fishpic',
		'grossy',
		'mother',
		'summercamp'
	];

	// Track which image is being hovered
	let hoveredImage: string | null = null;
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
			<!-- Film Canister Component -->
			<FilmCanister />

			<!-- Film Roll -->
			<div id="film">
				<ul>
					{#each filmPictures as picture}
						<li>
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								class="film-container"
								on:mouseenter={() => (hoveredImage = picture)}
								on:mouseleave={() => (hoveredImage = null)}
							>
								<!-- Loading placeholder -->
								<div class="placeholder {!loadedImages[picture] ? 'animate-pulse' : ''}"></div>

								<!-- Image with negative effect -->
								<img
									loading="lazy"
									src="photography/{picture}.webp"
									alt="film"
									on:load={() => handleImageLoad(picture)}
									class="film-negative"
								/>

								<!-- Spotlight overlay -->
								<div class="spotlight-overlay"></div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}
</main>

<style>
	#film {
		position: absolute;
		top: 35px;
		left: 130px;
		width: 80px;
		overflow: auto;
		overflow: hidden;
		transition: all 0.5s ease-in-out;
		z-index: 30;
	}

	#film:hover {
		width: 50vw;
		overflow-x: scroll;
	}

	#film:hover ul {
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

	/* Film negative effect */
	.film-negative {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: invert(1) hue-rotate(180deg) brightness(0.5) contrast(1.5) sepia(0.4);
		position: relative;
		z-index: 10;
		transition: all 0.3s ease-in-out;
	}

	/* Hover state to show original image */
	.film-container:hover .film-negative {
		filter: none;
		transform: scale(1.05);
	}

	/* Spotlight overlay */
	.spotlight-overlay {
		position: absolute;
		inset: 0;
		z-index: 20;
		background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	.film-container:hover .spotlight-overlay {
		opacity: 1;
	}

	/* Film border details */
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
