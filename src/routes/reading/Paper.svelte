<script lang="ts">
	import type { ReadingItem } from '$lib/reading';
	import { derivePaperColors } from '$lib/reading';

	export let item: ReadingItem;
	export let hovered = false;

	$: colors = derivePaperColors(item.coverColor);
</script>

<div
	class="folio-scene"
	style="--dark-color: {colors.dark}; --subtle-color: {colors.subtle}; --main-color: {colors.main}; --accent: {item.coverColor}"
>
	<div class="folio" class:open={hovered}>
		<span class="shadow"></span>
		<div class="back"></div>
		<div class="cover-end"></div>
		<div class="page last"></div>
		<div class="page third"></div>
		<div class="page second"></div>
		<div class="page first"></div>
		<div class="cover">
			<span class="band"></span>
		</div>
	</div>
</div>

<style>
	.folio-scene {
		display: flex;
		justify-content: center;
		align-items: center;
		perspective: 500px;
		width: 5.5rem;
		height: 8rem;
		flex-shrink: 0;
	}

	.folio {
		position: relative;
		width: 4.35rem;
		height: 6.75rem;
		transform-style: preserve-3d;
	}

	.shadow {
		position: absolute;
		bottom: 0;
		width: 74px;
		box-shadow: 0 8px 16px 8px var(--dark-color);
		transform: rotateY(-10deg);
	}

	.folio > div {
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
		width: 8px;
		background-color: var(--subtle-color);
	}

	.cover-end {
		transform: translateX(8px) rotateY(-10deg);
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
	}

	.cover {
		transform: scaleY(1.02) rotateY(-10deg);
		border: 1px solid var(--dark-color);
		overflow: hidden;
		background: var(--main-color);
	}

	.band {
		position: absolute;
		inset: 0 auto 0 0;
		width: 5px;
		background: var(--accent);
	}

	.folio.open .cover {
		transform: rotateY(-38deg);
	}

	.folio.open .page.first {
		transform: translateX(2px) rotateY(-38deg);
	}

	.folio.open .page.second {
		transform: translateX(4px) rotateY(-33deg);
	}

	.folio.open .page.third {
		transform: translateX(6px) rotateY(-28deg);
	}
</style>
