<script lang="ts">
	import type { ReadingItem } from '$lib/reading';
	import { derivePaperColors } from '$lib/reading';

	export let item: ReadingItem;
	export let hovered = false;

	$: colors = derivePaperColors(item.coverColor);
</script>

<div
	class="book-scene"
	style="--dark-color: {colors.dark}; --subtle-color: {colors.subtle}; --main-color: {colors.main}; --cover-color: {item.coverColor}"
>
	<div class="book" class:open={hovered}>
		<span class="shadow"></span>
		<div class="back"></div>
		<div class="cover-end"></div>
		<div class="page last">
			{#if item.quote}
				<blockquote>"{item.quote}"</blockquote>
			{/if}
		</div>
		<div class="page third"></div>
		<div class="page second"></div>
		<div class="page first"></div>
		<div class="cover">
			{#if item.coverImage}
				<img src={item.coverImage} alt="" />
			{:else}
				<div class="cover-fill"></div>
			{/if}
		</div>
	</div>
</div>

<style>
	.book-scene {
		display: flex;
		justify-content: center;
		align-items: center;
		perspective: 500px;
		width: 5.5rem;
		height: 8rem;
		flex-shrink: 0;
	}

	.book {
		position: relative;
		width: 5rem;
		height: 6.75rem;
		transform-style: preserve-3d;
	}

	.shadow {
		position: absolute;
		bottom: 0;
		width: 85px;
		box-shadow: 0 8px 16px 8px var(--dark-color);
		transform: rotateY(-10deg);
	}

	.book > div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform-origin: left;
		transition: transform 0.8s ease;
	}

	.back {
		height: 108px;
		width: 10px;
		background-color: var(--subtle-color);
	}

	.cover-end {
		transform: translateX(10px) rotateY(-10deg);
		border: 1px solid var(--dark-color);
		background-color: var(--subtle-color);
	}

	.page {
		background: linear-gradient(to right, var(--subtle-color), 20%, var(--main-color));
		border: 1px solid var(--subtle-color);
	}

	.page.first {
		transform: translateX(2px) rotateY(-10deg);
	}

	.page.second {
		transform: translateX(4px) rotateY(-10deg);
	}

	.page.third {
		transform: translateX(6px) rotateY(-10deg);
	}

	.page.last {
		transform: translateX(8px) rotateY(-10deg);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	.page.last blockquote {
		margin: 0;
		font-size: 0.45rem;
		line-height: 1.35;
		color: var(--dark-color);
		text-align: center;
	}

	.cover {
		transform: scaleY(1.02) rotateY(-10deg);
		border: 1px solid var(--dark-color);
		overflow: hidden;
		background: var(--cover-color);
	}

	.cover img,
	.cover-fill {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center center;
	}

	.cover-fill {
		background: var(--cover-color);
	}

	.book.open .cover {
		transform: rotateY(-38deg);
	}

	.book.open .page.first {
		transform: translateX(2px) rotateY(-38deg);
	}

	.book.open .page.second {
		transform: translateX(4px) rotateY(-33deg);
	}

	.book.open .page.third {
		transform: translateX(6px) rotateY(-28deg);
	}
</style>
