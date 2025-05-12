<script lang="ts">
	export let label: string = '';
</script>

<div class="holder">
	<div class="lid"></div>
	<div class="body">
		{#if label}
			<div class="canister-label">{label}</div>
		{/if}
		<div class="scale-75 opacity-25 translate-y-1.5 -translate-x-0.5 blur-[2px]">
			<slot />
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Gamja+Flower&family=Schoolbell&display=swap');
	.holder {
		position: relative;
		width: 130px;
		height: 240px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		transition: box-shadow 0.2s;
	}
	.holder:hover {
		animation: rock 0.35s cubic-bezier(0.1, 0.5, 0.3, 0.1) both;
	}
	@keyframes rock {
		0% {
			transform: rotate(0deg);
		}
		30% {
			transform: rotate(2deg);
		}
		70% {
			transform: rotate(-2deg) translateY(-10px);
		}
		100% {
			transform: rotate(0deg);
		}
	}
	.lid {
		width: 140px;
		height: 20px;
		background: radial-gradient(circle at 50% 30%, #888 70%, #555 100%);
		border-radius: 10px 10px 10px 10px/28px 28px 8px 8px;
		position: absolute;
		top: 7px;
		left: -5px;
		z-index: 2;
		box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.18);
	}
	.body {
		margin-top: 24px;
		width: 120px;
		height: 196px;
		background: linear-gradient(120deg, #fff 60%, #e0e0e0 100%);
		opacity: 0.88;
		border-radius: 8px 8px 0 0 / 8px 8px 0 0;
		box-shadow: 0 8px 18px 0 rgba(0, 0, 0, 0.1);
		border: 2px solid #bbb;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 1;
	}
	.canister-label {
		position: absolute;
		left: 50%;
		transform: translateX(-50%) rotate(-4deg);
		top: 18px;
		height: 170px;
		writing-mode: vertical-rl;
		text-orientation: mixed;
		font-family: 'Schoolbell', cursive;
		font-weight: 800;
		font-size: 2.8rem;
		color: #111;
		letter-spacing: 0.05em;
		user-select: none;
		pointer-events: none;
		z-index: 3;
	}
</style>
