<script lang="ts">
	import type { ReadingItem } from '$lib/reading';
	import { derivePaperColors } from '$lib/reading';

	export let item: ReadingItem;
	export let hovered = false;

	$: colors = derivePaperColors(item.coverColor);
</script>

<div
	class="paper-scene"
	style="--dark-color: {colors.dark}; --ink: {colors.dark}; --news: {colors.main}; --rule: {colors.subtle}; --accent: {item.coverColor}"
>
	<div class="paper" class:open={hovered}>
		<span class="shadow" />
		<div class="sheet back" />
		<div class="sheet inner">
			<div class="cols" aria-hidden="true">
				<span /><span /><span />
			</div>
		</div>
		<div class="sheet front">
			<p class="masthead">The Essay</p>
			<p class="headline">{item.title}</p>
			<div class="rules" aria-hidden="true">
				<span /><span /><span /><span />
			</div>
		</div>
	</div>
</div>

<style>
	.paper-scene {
		display: flex;
		justify-content: center;
		align-items: center;
		perspective: 560px;
		width: 5.5rem;
		height: 8rem;
		flex-shrink: 0;
	}

	.paper {
		position: relative;
		width: 5.15rem;
		height: 6.6rem;
		transform-style: preserve-3d;
	}

	.shadow {
		position: absolute;
		bottom: 2px;
		left: 6px;
		width: 72px;
		box-shadow: 0 8px 14px 6px var(--dark-color);
		transform: rotateY(-8deg);
	}

	.sheet {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform-origin: left center;
		transition: transform 0.75s ease;
		background: var(--news);
		border: 1px solid var(--rule);
	}

	.sheet.back {
		width: 8px;
		background: var(--rule);
		border: none;
	}

	.sheet.inner {
		transform: translateX(5px) rotateY(-8deg);
		padding: 0.45rem 0.35rem;
	}

	.sheet.front {
		transform: translateX(3px) rotateY(-8deg);
		padding: 0.4rem 0.35rem 0.3rem;
		display: flex;
		flex-direction: column;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.35), transparent 28%),
			var(--news);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 28%, transparent);
	}

	.masthead {
		margin: 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 0.42rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		text-align: center;
		color: var(--ink);
		border-bottom: 1.5px solid var(--ink);
		padding-bottom: 0.15rem;
	}

	.headline {
		margin: 0.28rem 0 0.22rem;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 0.48rem;
		line-height: 1.15;
		font-weight: 700;
		color: var(--ink);
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.rules,
	.cols {
		display: flex;
		flex-direction: column;
		gap: 0.16rem;
		flex: 1;
	}

	.rules span,
	.cols span {
		display: block;
		height: 2px;
		background: var(--rule);
		opacity: 0.85;
	}

	.rules span:nth-child(2) {
		width: 88%;
	}

	.rules span:nth-child(3) {
		width: 94%;
	}

	.rules span:nth-child(4) {
		width: 70%;
	}

	.cols {
		flex-direction: row;
		gap: 0.2rem;
		height: 100%;
	}

	.cols span {
		flex: 1;
		height: 100%;
		background: repeating-linear-gradient(
			to bottom,
			var(--rule) 0,
			var(--rule) 1px,
			transparent 1px,
			transparent 5px
		);
		opacity: 0.55;
	}

	.paper.open .sheet.front {
		transform: translateX(3px) rotateY(-42deg);
	}

	.paper.open .sheet.inner {
		transform: translateX(5px) rotateY(-22deg);
	}
</style>
