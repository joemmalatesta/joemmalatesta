<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let predictionDiv: HTMLDivElement;
	let isDrawing = false;
    let hasDrawn = false;

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		setupCanvas();
	});

	function setupCanvas() {
		ctx.strokeStyle = '#f2f2f2';
		ctx.lineWidth = 10;
		ctx.lineCap = 'round';
		clearCanvas();
	}

	function startDrawing(e: MouseEvent) {
		isDrawing = true;
		draw(e);
	}

	function stopDrawing() {
		isDrawing = false;
		ctx.beginPath();
	}

	function draw(e: MouseEvent) {
		if (!isDrawing) return;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		ctx.lineTo(x, y);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x, y);
        hasDrawn = true;
	}

	function clearCanvas() {
		ctx.fillStyle = '#2a2a2a';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		hasDrawn = false;
	}

	async function getImageData(): Promise<string> {
		return new Promise((resolve) => {
			const imageData = canvas.toDataURL('image/png');
			resolve(imageData);
		});
	}

	let label: number = -1;
	let selectLabelError: boolean = false;
    let hasDrawnError: boolean = false;
	async function predict() {
		selectLabelError = false;
		hasDrawnError = false;
		const imageData = await getImageData();
        if (!hasDrawn) {
            hasDrawnError = true;
            return;
        }
		if (label === -1) {
			selectLabelError = true;
			return;
		}

		try {
			const response = await fetch('/api/predict', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ image: imageData, label: label.toString() })
			});

			if (!response.ok) {
				throw new Error('Prediction failed');
			}

			const result = await response.json();
			predictionDiv.textContent = `Prediction: ${result.prediction}`;
		} catch (error) {
			console.error('Error during prediction:', error);
			predictionDiv.textContent = 'Error: Failed to get prediction';
		}
	}
</script>

<div class="flex flex-col items-center">
	<h1 class="text-2xl font-bold mb-4">Model</h1>
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<div class="flex gap-2 items-center justify-center">
		<canvas
			bind:this={canvas}
			width="280"
			height="280"
			class="rounded-md ring-2 ring-light/20"
			on:mousedown={startDrawing}
			on:mousemove={draw}
			on:mouseup={stopDrawing}
			on:mouseout={stopDrawing}
		></canvas>
		<div class="grid grid-cols-2 gap-2">
			{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as option}
				<button
					class="text-lg w-20 h-12 rounded-md {label === option
						? 'bg-light/50'
						: 'bg-light/5 hover:bg-light/10'} transition-all duration-300"
					on:click={() => (label = option)}>{option}</button
				>
			{/each}
		</div>
	</div>
	{#if selectLabelError}
		<p class="text-red-500">Please select a label</p>
    {:else if hasDrawnError}
		<p class="text-red-500">Please draw a digit</p>
	{/if}
	<div class="flex gap-4 mt-4">
		<button on:click={clearCanvas}>Clear</button>
		<button on:click={predict}>Predict</button>
	</div>
	<div bind:this={predictionDiv} class="prediction"></div>
</div>
