<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Book } from '$lib/books';
	import { deriveBookColors } from '$lib/books';

	export let book: Book;
	/** list: partial open on hover. detail: full open on hover */
	export let mode: 'list' | 'detail' = 'list';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let mobileOpen = false;
	/** Controlled by parent hover group (list page) */
	export let hovered = false;

	const dispatch = createEventDispatcher<{ toggle: void }>();

	let innerWidth: number;
	let hoverOpen = false;

	$: smallScreen = innerWidth < 640;
	$: isInteractive = mode === 'detail' || (mode === 'list' && smallScreen);
	$: isOpen =
		mode === 'list'
			? !smallScreen && hovered
			: isInteractive && (smallScreen ? mobileOpen : hoverOpen);
	$: colors = deriveBookColors(book.coverColor);
</script>

<svelte:window bind:innerWidth />

<div
	class="book-scene {size}"
	class:small={smallScreen}
	class:list={mode === 'list'}
	class:detail={mode === 'detail'}
	style="--dark-color: {colors.dark}; --subtle-color: {colors.subtle}; --main-color: {colors.main}; --cover-color: {book.coverColor}"
	on:mouseenter={() => mode === 'detail' && !smallScreen && (hoverOpen = true)}
	on:mouseleave={() => mode === 'detail' && !smallScreen && (hoverOpen = false)}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="book"
		class:open={isOpen}
		on:click|stopPropagation={() => mode === 'detail' && smallScreen && dispatch('toggle')}
		on:keydown={(e) => {
			if (mode === 'detail' && smallScreen && (e.key === 'Enter' || e.key === ' ')) {
				e.preventDefault();
				dispatch('toggle');
			}
		}}
		role={mode === 'detail' && smallScreen ? 'button' : undefined}
		tabindex={mode === 'detail' && smallScreen ? 0 : undefined}
		aria-label={mode === 'detail' && smallScreen ? `Reveal quote from ${book.title}` : undefined}
		aria-expanded={mode === 'detail' && smallScreen ? isOpen : undefined}
	>
		<span class="shadow" />

		<div class="back" />

		<div class="cover-end" />

		<div class="page last">
			<blockquote>"{book.quote}"</blockquote>
		</div>

		<div class="page third" />
		<div class="page second" />
		<div class="page first" />

		<div class="cover">
			{#if book.coverImage}
				<img src={book.coverImage} alt={book.title} />
			{:else}
				<div class="cover-fill" />
			{/if}
		</div>
	</div>

	{#if mode === 'detail' && smallScreen}
		<p class="tap-hint" class:visible={!isOpen}>tap to open</p>
	{/if}
</div>

<style>
	.book-scene {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		perspective: 500px;
		perspective-origin: 50% 50%;
		flex-shrink: 0;
	}

	.book-scene.sm {
		width: 5.5rem;
		height: 8rem;
	}

	.book-scene.sm .book {
		width: 5rem;
		height: 6.75rem;
	}

	.book-scene.sm .back {
		height: 108px;
	}

	.book-scene.sm .shadow {
		width: 85px;
	}

	.book-scene.md {
		width: 10rem;
		height: 13rem;
	}

	.book-scene.md .book {
		width: 9.375rem;
		height: 12.5rem;
	}

	.book-scene.lg {
		width: 12rem;
		height: 16rem;
	}

	.book-scene.lg .book {
		width: 10.5rem;
		height: 14rem;
	}

	.book-scene.lg .back {
		height: 224px;
	}

	.book-scene.lg .shadow {
		width: 180px;
	}

	.book-scene.xl {
		width: 15rem;
		height: 20rem;
	}

	.book-scene.xl .book {
		width: 12.5rem;
		height: 16.5rem;
	}

	.book-scene.xl .back {
		height: 264px;
	}

	.book-scene.xl .shadow {
		width: 210px;
	}

	.book {
		position: relative;
		width: 9.375rem;
		height: 12.5rem;
		transform-style: preserve-3d;
		cursor: default;
	}

	.book-scene.list.small .book,
	.book-scene.detail.small .book,
	.book-scene.detail:not(.small) .book {
		cursor: pointer;
	}

	.book-scene.list:not(.small) .book {
		cursor: inherit;
	}

	.shadow {
		position: absolute;
		bottom: 0;
		width: 160px;
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
		height: 200px;
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
		font-family: 'Dancing Script', cursive;
		font-size: 0.55rem;
		line-height: 1.35;
		color: var(--dark-color);
		text-align: center;
	}

	.sm .page.last blockquote {
		font-size: 0.45rem;
	}

	.lg .page.last blockquote,
	.xl .page.last blockquote {
		font-size: 0.85rem;
		padding: 0 0.25rem;
	}

	@media (min-width: 640px) {
		.page.last blockquote {
			font-size: 0.65rem;
		}

		.lg .page.last blockquote,
		.xl .page.last blockquote {
			font-size: 1rem;
		}
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

	/* ~1/4 open on list hover */
	.book-scene.list .book.open .cover {
		transform: rotateY(-38deg);
	}

	.book-scene.list .book.open .page.first {
		transform: translateX(2px) rotateY(-38deg);
	}

	.book-scene.list .book.open .page.second {
		transform: translateX(4px) rotateY(-33deg);
	}

	.book-scene.list .book.open .page.third {
		transform: translateX(6px) rotateY(-28deg);
	}

	/* full open on detail hover */
	.book-scene.detail .book.open .cover {
		transform: rotateY(-150deg);
	}

	.book-scene.detail .book.open .page.first {
		transform: translateX(2px) rotateY(-150deg);
	}

	.book-scene.detail .book.open .page.second {
		transform: translateX(4px) rotateY(-130deg);
	}

	.book-scene.detail .book.open .page.third {
		transform: translateX(6px) rotateY(-110deg);
	}

	.tap-hint {
		text-align: center;
		font-size: 0.65rem;
		opacity: 0;
		transition: opacity 0.3s;
		margin-top: 0.25rem;
	}

	.tap-hint.visible {
		opacity: 0.45;
	}
</style>
