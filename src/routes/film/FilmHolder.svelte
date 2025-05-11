<script lang="ts">
	// No props needed for now
</script>

<div class="holder">
	<div class="lid"></div>
	<div class="body">
		<div class="scale-75 opacity-30 translate-y-1.5 -translate-x-0.5">
			<slot />
		</div>
	</div>
</div>

<style>
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
		animation: rock 0.5s cubic-bezier(0.1, 0.5, 0.3, 0.1) both;
	}
	@keyframes rock {
		0% {
			transform: rotate(0deg);
		}
		20% {
			transform: rotate(-5deg);
		}
		40% {
			transform: rotate(4deg);
		}
		60% {
			transform: rotate(-3deg);
		}
		80% {
			transform: rotate(2deg);
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
</style>
