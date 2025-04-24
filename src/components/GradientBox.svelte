<script lang="ts">
	export let title: string;
	export let href: string;

	// Array of gradient combinations
	const gradients = [
		{ from: '#b784e3', to: '#e0b08c' }, // Deeper Purple to Peach
		{ from: '#9d7ee3', to: '#7de0c9' }, // Deeper Lavender to Mint
		{ from: '#e0adc4', to: '#8799e0' }, // Deeper Cotton Candy to Periwinkle
		{ from: '#3f2b96', to: '#a8c0ff' }, // Deep Blue to Light Blue
		{ from: '#c78bc9', to: '#7d9ee0' }, // Deeper Violet to Sky
		{ from: '#8ad6ca', to: '#e0879d' }, // Deeper Aqua to Pink
		{ from: '#c9a3e6', to: '#e69999' }, // Deeper Violet to Coral
		{ from: '#ff6b6b', to: '#4ecdc4' }, // Coral to Turquoise
	];

	const gradientIndex = title.length % gradients.length;
	const gradient = gradients[gradientIndex];
</script>

<a
	{href}
	class="block w-full h-32 md:h-64 relative group overflow-hidden rounded-lg ring-2 ring-white/10"
>
	<!-- Base gradient background -->
	<div
		class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
		style="background-image: linear-gradient(to bottom right, {gradient.from}, {gradient.to})"
	/>

	<!-- Dark overlay for better text contrast -->
	<div class="absolute inset-0 bg-black/25 z-10" />

	<!-- Multiple noise texture overlays for increased grain -->
	<div
		class="absolute inset-0 mix-blend-overlay opacity-100 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjEuNSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC40Ii8+PC9zdmc+')]"
	/>
	<div
		class="absolute inset-0 mix-blend-overlay opacity-70 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjIuNSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4yIi8+PC9zdmc+')]"
	/>

	<!-- Content -->
	<div class="relative h-full flex items-center justify-center">
		<h3 class="text-3xl font-semibold text-light z-20">{title}</h3>
	</div>

	<!-- Default state background -->
	<div class="absolute inset-0 bg-light/10 group-hover:opacity-0 transition-opacity duration-500" />
</a>
