<script lang="ts">
	import { onMount } from 'svelte';
	import { filmImages, type FilmImage } from '$lib/film';
	import MapPin from 'phosphor-svelte/lib/MapPin';
	import { fly } from 'svelte/transition';
	export let folder: string;

	let images: FilmImage[] = [];
	let stack: FilmImage[] = [];
	let dragging = false;
	let dragX = 0;
	let startX = 0;
	let threshold = 80; // px to trigger swipe

	onMount(() => {
		images = filmImages.filter((img) => img.category === folder) || [];
		stack = [...images];
	});

	$: if (folder) {
		images = filmImages.filter((img) => img.category === folder) || [];
		stack = [...images];
	}

	function handlePointerDown(e: PointerEvent) {
		dragging = true;
		startX = e.clientX;
		dragX = 0;
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerup', handlePointerUp);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!dragging) return;
		dragX = e.clientX - startX;
	}

	function handlePointerUp() {
		if (Math.abs(dragX) > threshold) {
			// Animate out and remove top image
			stack = stack.slice(1);
		}
		dragging = false;
		dragX = 0;
		window.removeEventListener('pointermove', handlePointerMove);
		window.removeEventListener('pointerup', handlePointerUp);
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

<div class="mobile-stack flex flex-col items-center relative min-h-[80vw] w-full justify-center">
	{#each stack.slice(0, 3) as img, i (img.source)}
		<img
			src={img.source}
			alt={img.description}
			class="stacked-img"
			style="
        z-index: {100 - i};
        transform: translateX({i === 0 && dragging ? dragX : getOffset(i)}px) rotate({getRotation(
				i
			)}deg) scale({1 - i * 0.04});
        top: {i * 8}px;
        opacity: {i === 0 ? 1 : 0.85 - i * 0.1};
        cursor: {i === 0 ? 'grab' : 'default'};
      "
			on:pointerdown={i === 0 ? handlePointerDown : undefined}
			draggable="false"
		/>
	{/each}
	{#if stack[0]}
		<div class="info-panel">
			<h3 class="font-bold text-lg mb-1">{stack[0].description}</h3>
			<div class="flex gap-1 items-center justify-center">
				<MapPin size={16} />
				<span class="text-xs italic">{stack[0].location}</span>
			</div>
		</div>
	{/if}
</div>

<style>
	@media (min-width: 641px) {
		.mobile-stack {
			display: none;
		}
	}
	@media (max-width: 640px) {
		.mobile-stack {
			display: flex;
		}
	}
	.stacked-img {
		position: absolute;
		left: 0;
		right: 0;
		margin: auto;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
		border-radius: 8px;
		border: 6px solid #fff;
		width: 90vw;
		max-width: 350px;
		user-select: none;
		touch-action: pan-x;
		transition:
			transform 0.25s cubic-bezier(0.4, 2, 0.6, 1),
			box-shadow 0.2s;
	}
	.info-panel {
		margin-top: 70vw;
		max-width: 350px;
		width: 90vw;
		background: rgba(30, 30, 30, 0.92);
		border-radius: 0 0 12px 12px;
		padding: 1rem;
		color: #eee;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
		font-family: monospace;
	}
</style>
