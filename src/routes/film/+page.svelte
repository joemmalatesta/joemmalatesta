<script lang="ts">
	import { onMount } from 'svelte';
	import createGlobe from 'cobe';
	import { spring } from 'svelte/motion';
	import { cn } from '$lib/utils';

	let x = spring(0, {
		stiffness: 0.04,
		damping: 0.4,
		precision: 0.005
	});

	let className = '';
	export { className as class };
	let pointerInteracting: any = null;
	let pointerInteractionMovement = 0;
	let canvas: HTMLCanvasElement;

	let phi = 0;
	let theta = 0.3;
	let width = 0;
	let currentPhi = 0;
	let currentTheta = 0;
	const doublePi = Math.PI * 2;
	let focusPhi = 0;
	let focusTheta = 0;

	const locationToAngles = (lat: number, long: number) => {
		return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180];
	};

	const rotateToLocation = (lat: number, long: number) => {
		[focusPhi, focusTheta] = locationToAngles(lat, long);
	};

	let onResize = () => {
		width = canvas.offsetWidth;
	};

	let onRender = (state: any) => {
		if (!pointerInteracting) {
			const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
			const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;

			if (distPositive < distNegative) {
				currentPhi += distPositive * 0.08;
			} else {
				currentPhi -= distNegative * 0.08;
			}
			currentTheta = currentTheta * 0.92 + focusTheta * 0.08;
		}

		state.phi = currentPhi;
		state.theta = currentTheta;
		state.width = width * 2;
		state.height = width * 2;
	};

	onMount(() => {
		window.addEventListener('resize', onResize);
		onResize();

		const globe = createGlobe(canvas, {
			devicePixelRatio: 2,
			width: width * 2,
			height: width * 2,
			phi: 0,
			theta: 0.3,
			dark: 1,
			diffuse: 3,
			mapSamples: 16000,
			mapBrightness: 1.2,
			baseColor: [1, 1, 1],
			markerColor: [251 / 255, 200 / 255, 21 / 255],
			glowColor: [1.2, 1.2, 1.2],
			markers: [
				{ location: [37.78, -122.412], size: 0.1 },
				{ location: [52.52, 13.405], size: 0.1 },
				{ location: [35.676, 139.65], size: 0.1 },
				{ location: [-34.6, -58.38], size: 0.1 }
			],
			onRender: onRender
		});

		setTimeout(() => {
			canvas.style.opacity = '1';
		});

		return () => {
			window.removeEventListener('resize', onResize);
			globe.destroy();
		};
	});
</script>

<main class={cn('absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]', className)}>
	<canvas
		class="h-full w-full [contain:layout_paint_size] opacity-0 transition-opacity duration-1000"
		bind:this={canvas}
		on:pointerdown={(e) => {
			pointerInteracting = e.clientX - pointerInteractionMovement;
			canvas.style.cursor = 'grabbing';
		}}
		on:pointerup={() => {
			pointerInteracting = null;
			canvas.style.cursor = 'grab';
		}}
		on:pointerout={() => {
			pointerInteracting = null;
			canvas.style.cursor = 'grab';
		}}
		on:mousemove={(e) => {
			if (pointerInteracting !== null) {
				const delta = e.clientX - pointerInteracting;
				pointerInteractionMovement = delta;
				x.set(delta / 200);
			}
		}}
	/>
	<div class="flex flex-col md:flex-row justify-center items-center gap-2 mt-4">
		<span>Rotate to:</span>
		<button
			class="bg-[rgba(155,155,155,0.2)] rounded-lg px-2 py-1 cursor-pointer"
			on:click={() => rotateToLocation(37.78, -122.412)}
		>
			📍 San Francisco
		</button>
		<button
			class="bg-[rgba(155,155,155,0.2)] rounded-lg px-2 py-1 cursor-pointer"
			on:click={() => rotateToLocation(52.52, 13.405)}
		>
			📍 Berlin
		</button>
		<button
			class="bg-[rgba(155,155,155,0.2)] rounded-lg px-2 py-1 cursor-pointer"
			on:click={() => rotateToLocation(35.676, 139.65)}
		>
			📍 Tokyo
		</button>
		<button
			class="bg-[rgba(155,155,155,0.2)] rounded-lg px-2 py-1 cursor-pointer"
			on:click={() => rotateToLocation(-34.6, -58.38)}
		>
			📍 Buenos Aires
		</button>
	</div>
</main>
