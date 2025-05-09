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

	// Toggle between film canisters
	let activeCanister = 'gold'; // 'gold' or 'fuji'
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
			<!-- Film Canister Selector -->
			<div class="canister-selector">
				<button
					class="selector-btn {activeCanister === 'gold' ? 'active' : ''}"
					on:click={() => (activeCanister = 'gold')}
				>
					Gold
				</button>
				<button
					class="selector-btn {activeCanister === 'fuji' ? 'active' : ''}"
					on:click={() => (activeCanister = 'fuji')}
				>
					Fujifilm
				</button>
			</div>

			<!-- Gold Film Canister -->
			<div id="can" class={activeCanister === 'gold' ? 'visible' : 'hidden'}>
				<div id="topcap"></div>
				<div id="text">
					<p class="gold">GOLD</p>
					<p class="num">2024</p>
					<p class="mm">35mm film for color prints</p>
				</div>
				<div id="bottomcap"></div>
			</div>

			<!-- Fujifilm Canister -->
			<div id="fuji-can" class={activeCanister === 'fuji' ? 'visible' : 'hidden'}>
				<div id="fuji-topcap"></div>
				<div id="fuji-text">
					<p class="fuji-brand">FUJIFILM</p>
					<p class="fuji-num">400</p>
					<p class="fuji-desc">FILM FOR COLOR PRINTS</p>
				</div>
				<div id="fuji-bottomcap"></div>
			</div>

			<!-- Film Roll -->
			<div id="film" class={activeCanister === 'fuji' ? 'fuji-active' : ''}>
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
									class="film-negative {activeCanister === 'fuji' ? 'fuji-filter' : ''}"
								/>

								<!-- Spotlight overlay -->
								<div class="spotlight-overlay"></div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{:else}
		<!-- Skeleton loading state -->
		<section class="gap-1 py-5">
			<div class="h-10 w-40 bg-light/5 rounded-lg animate-pulse mb-2"></div>
			<div class="h-5 w-72 bg-light/5 rounded-lg animate-pulse"></div>
		</section>
		<section class="gap-1">
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full py-2">
				{#each Array(9) as _}
					<div class="w-full h-40 bg-light/5 rounded-lg animate-pulse"></div>
				{/each}
			</div>
		</section>
	{/if}
</main>

<style>
	img {
		max-width: 100%;
	}

	.canister-selector {
		position: absolute;
		top: -20px;
		left: 50px;
		z-index: 45;
		display: flex;
		gap: 5px;
	}

	.selector-btn {
		padding: 5px 10px;
		background: rgba(20, 20, 20, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 5px;
		color: rgba(255, 255, 255, 0.8);
		font-size: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.selector-btn.active {
		background: rgba(40, 40, 40, 0.9);
		border-color: rgba(255, 255, 255, 0.5);
		color: white;
	}

	.selector-btn:hover {
		background: rgba(50, 50, 50, 0.9);
	}

	/* Gold Canister Styles */
	#topcap,
	#bottomcap {
		position: absolute;
		left: -5px;
		width: 130px;
		height: 10px;
		background: linear-gradient(
			to right,
			rgba(63, 63, 63, 1) 0%,
			rgba(0, 0, 0, 1) 17%,
			rgba(86, 86, 86, 1) 39%,
			rgba(14, 14, 14, 1) 89%,
			rgba(71, 71, 71, 1) 100%
		);
	}

	#bottomcap {
		bottom: 0;
	}

	#can {
		box-shadow: 8px 0px 10px rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 20px;
		left: 50px;
		width: 120px;
		height: 230px;
		background: linear-gradient(
			to right,
			rgba(164, 97, 8, 1) 0%,
			rgba(242, 216, 67, 1) 38%,
			rgba(223, 150, 35, 1) 80%,
			rgba(164, 97, 8, 1) 100%
		);
		z-index: 40;
		transition: opacity 0.3s ease;
	}

	#can #text {
		transform: rotate(90deg) translate(60px, 40px);
		display: block;
		color: #000;
		font-family: helvetica;
		font-weight: bold;
		text-align: center;
		width: 200px;
	}

	#can p {
		margin: 0;
	}

	#can p.gold {
		font-size: 3em;
		line-height: 0.9em;
	}

	#can p.num {
		font-size: 2em;
		font-style: italic;
	}

	#can p.mm {
		font-size: 0.8em;
		font-family: serif;
	}

	/* Fujifilm Canister Styles */
	#fuji-topcap,
	#fuji-bottomcap {
		position: absolute;
		left: -5px;
		width: 130px;
		height: 10px;
		background: linear-gradient(
			to right,
			rgba(63, 63, 63, 1) 0%,
			rgba(0, 0, 0, 1) 17%,
			rgba(86, 86, 86, 1) 39%,
			rgba(14, 14, 14, 1) 89%,
			rgba(71, 71, 71, 1) 100%
		);
	}

	#fuji-bottomcap {
		bottom: 0;
	}

	#fuji-can {
		box-shadow: 8px 0px 10px rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 20px;
		left: 50px;
		width: 120px;
		height: 230px;
		background: linear-gradient(
			to right,
			rgba(125, 125, 125, 1) 0%,
			rgba(200, 200, 200, 1) 40%,
			rgba(255, 255, 255, 1) 50%,
			rgba(200, 200, 200, 1) 60%,
			rgba(125, 125, 125, 1) 100%
		);
		z-index: 40;
		transition: opacity 0.3s ease;
	}

	#fuji-can::before {
		content: '';
		position: absolute;
		top: 30px;
		left: 0;
		width: 120px;
		height: 110px;
		background: #43a047;
		z-index: -1;
	}

	#fuji-can #fuji-text {
		transform: rotate(90deg) translate(60px, 40px);
		display: block;
		color: #fff;
		font-family: helvetica;
		font-weight: bold;
		text-align: center;
		width: 200px;
	}

	#fuji-can p {
		margin: 0;
	}

	#fuji-can p.fuji-brand {
		font-size: 2.5em;
		line-height: 0.9em;
		color: #fff;
		text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
	}

	#fuji-can p.fuji-num {
		font-size: 3em;
		font-weight: 800;
		color: #000;
	}

	#fuji-can p.fuji-desc {
		font-size: 0.7em;
		font-family: sans-serif;
		color: #000;
	}

	.visible {
		display: block;
		opacity: 1;
	}

	.hidden {
		display: none;
		opacity: 0;
	}

	#film {
		position: absolute;
		top: 35px;
		left: 160px;
		width: 150px;
		overflow: hidden;
		transition: all 1s;
		z-index: 30;
	}

	#film:hover {
		width: 80vw;
		max-width: 1200px;
	}

	#film:hover ul {
		transform: translatex(0px);
	}

	#film.fuji-active ul {
		border-image: url(https://i.imgur.com/Sm9CNai.png) 27 fill repeat stretch;
		border-color: #43a047;
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

	/* Fuji filter variation */
	.film-negative.fuji-filter {
		filter: invert(1) hue-rotate(140deg) brightness(0.6) contrast(1.7) sepia(0.3);
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
