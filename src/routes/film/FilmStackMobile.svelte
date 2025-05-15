<script lang="ts">
	import { filmImages, type FilmImage, filmFolders } from '$lib/film';
	import MapPin from 'phosphor-svelte/lib/MapPin';
	import FilmHolder from './FilmHolder.svelte';
	import FilmCanister from './FilmCanister.svelte';

	let selectedFolder: string | null = null;
	let images: FilmImage[] = [];
	let stack: FilmImage[] = [];
	let dragging = false;
	let dragX = 0;
	let startX = 0;
	let threshold = 80; // px to trigger swipe
	let showTutorial = true;

	$: if (selectedFolder) {
		images = filmImages.filter((img) => img.category === selectedFolder) || [];
		stack = [...images];
	}

	function handleTouchStart(e: TouchEvent) {
		dragging = true;
		startX = e.touches[0].clientX;
		dragX = 0;
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleTouchEnd);

		// Hide tutorial when user starts interacting
		showTutorial = false;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!dragging) return;
		dragX = e.touches[0].clientX - startX;
	}

	function handleTouchEnd() {
		if (Math.abs(dragX) > threshold) {
			stack = stack.slice(1);
			showTutorial = false; // Hide tutorial after first successful swipe
		}
		dragging = false;
		dragX = 0;
		window.removeEventListener('touchmove', handleTouchMove);
		window.removeEventListener('touchend', handleTouchEnd);
	}

	function getRotation(i: number) {
		// Top image: dynamic, others: fixed
		if (i === 0 && dragging) return dragX / 10;
		return (i % 2 === 0 ? -1 : 1) * (4 + i * 1.5);
	}
	function getOffset(i: number) {
		return i * 8;
	}
</script>

<div class="mobile-stack flex flex-col items-center relative w-full justify-center">
	{#each stack.slice(0, 3) as img, i (img.source)}
		<img
			src={img.source}
			alt={img.description}
			class="stacked-img border-[6px] border-neutral-700/80"
			style="
        z-index: {100 - i};
        transform: translateX({i === 0 && dragging ? dragX : getOffset(i)}px) rotate({getRotation(
				i
			)}deg) scale({1 - i * 0.04});
        top: {i * 8}px;
        opacity: {i === 0
				? dragging
					? Math.max(0, 1 - Math.abs(dragX) / 400)
					: 1
				: 0.85 - i * 0.1};
        cursor: {i === 0 ? 'grab' : 'default'};
      "
			on:touchstart={i === 0 ? handleTouchStart : undefined}
			draggable="false"
		/>
	{/each}

	{#if showTutorial && stack.length > 0}
		<div
			class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl p-12 bg-dark/30"
			style="z-index: 200;"
		>
			<div class="swipe-indicator">
				<div class="swipe-hand"></div>
				<div class="text-light text-sm font-semibold">Swipe to view next</div>
			</div>
		</div>
	{/if}

	{#if stack[0]}
		<div class=" bg-neutral-950/90 rounded-xl p-4 text-gray-200 font-mono mt-64">
			<h3 class="font-bold text-lg mb-1">{stack[0].description}</h3>
			<div class="flex gap-1 items-center justify-center">
				<MapPin size={16} />
				<span class="text-xs italic">{stack[0].location}</span>
			</div>
		</div>
	{:else}
		<div class="flex flex-wrap justify-center">
			{#each filmFolders as folder}
				{#if folder !== selectedFolder}
					<button
						class="scale-[.65] sm:scale-75 p-0 w-28 sm:w-32"
						on:click={() => (selectedFolder = folder)}
					>
						<FilmHolder label={folder}>
							<FilmCanister title={folder} />
						</FilmHolder>
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.stacked-img {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
		border-radius: 8px;
		max-width: 350px;
		transition:
			transform 0.25s cubic-bezier(0.4, 2, 0.6, 1),
			box-shadow 0.2s;
	}
	.swipe-indicator {
		display: flex;
		flex-direction: column;
		align-items: center;
		animation: fadeInOut 3s ease-in-out;
	}
	.swipe-hand {
		width: 40px;
		height: 40px;
		z-index: 200;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' fill='%23f2f2f2' viewBox='0 0 256 256'%3E%3Cpath d='M196,88a27.86,27.86,0,0,0-13.35,3.39A28,28,0,0,0,144,74.7V44a28,28,0,0,0-56,0v80l-3.82-6.13A28,28,0,0,0,35.73,146l4.67,8.23C74.81,214.89,89.05,240,136,240a88.1,88.1,0,0,0,88-88V116A28,28,0,0,0,196,88Zm12,64a72.08,72.08,0,0,1-72,72c-37.63,0-47.84-18-81.68-77.68l-4.69-8.27,0-.05A12,12,0,0,1,54,121.61a11.88,11.88,0,0,1,6-1.6,12,12,0,0,1,10.41,6,1.76,1.76,0,0,0,.14.23l18.67,30A8,8,0,0,0,104,152V44a12,12,0,0,1,24,0v68a8,8,0,0,0,16,0V100a12,12,0,0,1,24,0v20a8,8,0,0,0,16,0v-4a12,12,0,0,1,24,0Z'/%3E%3C/svg%3E");
		background-size: contain;
		background-repeat: no-repeat;
		animation: swipeAnimation 1.5s infinite;
		margin-bottom: 10px;
	}
	@keyframes swipeAnimation {
		0% {
			transform: translateX(30px);
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			transform: translateX(-30px);
			opacity: 0;
		}
	}
	@keyframes fadeInOut {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
