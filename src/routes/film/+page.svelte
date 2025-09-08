<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Header from '../../components/Heading.svelte';
	import FilmRoll from './FilmRoll.svelte';
	import FilmHolder from './FilmHolder.svelte';
	import FilmCanister from './FilmCanister.svelte';
	import { filmImages, type FilmImage } from '$lib/film';
	import MapPin from 'phosphor-svelte/lib/MapPin';
	import FilmStackMobile from './FilmStackMobile.svelte';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';

	let ready = false;
	onMount(() => {
		ready = true;
	});

	const filmCategories = ['Asia', '2022', '2024', '2025', 'Michigan', 'SF'];
	let activeCategory: string | null = null;
	let hoveredImage: FilmImage | null = null;
	let stickyImage: FilmImage | null = null;
	let modalImage: FilmImage | null = null;
	let showModalInfo = false;
	let carouselIndex = 0;
	let currentImageIndex = 0;
	let currentCategoryImages: FilmImage[] = [];

	function setActiveCategory(category: string) {
		activeCategory = category;
		carouselIndex = 0; // Reset carousel to start
		stickyImage = null; // Clear sticky image when switching rolls
	}

	function openModal(image: FilmImage) {
		modalImage = image;
		// Get all images from the current category
		currentCategoryImages = filmImages.filter((img) => img.category === image.category);
		// Find the index of the current image
		currentImageIndex = currentCategoryImages.findIndex((img) => img.source === image.source);
		document.body.style.overflow = 'hidden'; // Prevent background scrolling
	}

	function closeModal() {
		modalImage = null;
		showModalInfo = false;
		currentCategoryImages = [];
		currentImageIndex = 0;
		document.body.style.overflow = 'auto'; // Restore scrolling
	}

	function nextModalImage() {
		if (currentCategoryImages.length > 1 && currentImageIndex < currentCategoryImages.length - 1) {
			currentImageIndex = currentImageIndex + 1;
			modalImage = currentCategoryImages[currentImageIndex];
		}
	}

	function prevModalImage() {
		if (currentCategoryImages.length > 1 && currentImageIndex > 0) {
			currentImageIndex = currentImageIndex - 1;
			modalImage = currentCategoryImages[currentImageIndex];
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && modalImage) {
			closeModal();
		} else if (
			event.key === 'ArrowRight' &&
			modalImage &&
			currentImageIndex < currentCategoryImages.length - 1
		) {
			nextModalImage();
		} else if (event.key === 'ArrowLeft' && modalImage && currentImageIndex > 0) {
			prevModalImage();
		}
	}

	function nextCarousel() {
		const remainingCategories = filmCategories.filter((c) => c !== activeCategory);
		carouselIndex = (carouselIndex + 1) % remainingCategories.length;
	}

	function prevCarousel() {
		const remainingCategories = filmCategories.filter((c) => c !== activeCategory);
		carouselIndex = (carouselIndex - 1 + remainingCategories.length) % remainingCategories.length;
	}

	$: remainingCategories = filmCategories.filter((c) => c !== activeCategory);
	$: visibleCategories = (() => {
		if (remainingCategories.length <= 3) {
			return remainingCategories;
		}
		// Ensure we always get 3 by wrapping around
		const start = carouselIndex % remainingCategories.length;
		const end = start + 3;
		if (end <= remainingCategories.length) {
			return remainingCategories.slice(start, end);
		} else {
			// Wrap around case
			return [
				...remainingCategories.slice(start),
				...remainingCategories.slice(0, end - remainingCategories.length)
			];
		}
	})();
	$: showNavigation = remainingCategories.length > 3;
</script>

<svelte:window on:keydown={handleKeydown} />

<main class="min-h-screen">
	{#if ready}
		<section class="gap-1 py-5" transition:fly={{ y: 50, duration: 400, delay: 0 }}>
			<Header
				title="Film Gallery"
				description="I've got a film camera. I take pictures when I remember it."
			/>
		</section>
		<section
			class="{!activeCategory ? 'md:flex md:justify-center' : 'md:flex md:justify-between'} hidden"
			transition:fly={{ y: 50, duration: 400, delay: 200 }}
		>
			<!-- Show only the active FilmRoll on the left -->
			{#if activeCategory}
				<div class="md:w-2/5">
					{#key activeCategory}
						<div class="absolute top-32">
							<FilmRoll folder={activeCategory} bind:hoveredImage bind:stickyImage />
						</div>
					{/key}
				</div>
			{/if}

			<!-- Right side with film canisters and hovered image -->
			<div class="{activeCategory ? 'md:w-3/5' : 'md:w-full'} flex flex-col items-start gap-5">
				<!-- Show the other categories as canisters in the holder -->
				<div class="relative w-full">
					<!-- Navigation buttons -->
					{#if activeCategory && showNavigation}
						<button
							on:click={prevCarousel}
							class="absolute left-0 top-1/2 -translate-x-7 -translate-y-3 opacity-70 hover:opacity-100"
						>
							<CaretLeft size={25} />
						</button>

						<button
							on:click={nextCarousel}
							class="absolute right-0 top-1/2 -translate-y-3 translate-x-5 opacity-70 hover:opacity-100"
						>
							<CaretRight size={25} />
						</button>
					{/if}

					<!-- Canisters display with visual hierarchy -->
					<div class="flex gap-5 justify-start flex-wrap items-center min-h-[120px]">
						{#if activeCategory}
							{#each visibleCategories as category, index}
								<button
									on:click={() => setActiveCategory(category)}
									class="transform transition-all duration-300 scale-90 opacity-60 hover:scale-95 hover:opacity-80"
								>
									<FilmHolder label={category}>
										<FilmCanister title={category} />
									</FilmHolder>
								</button>
							{/each}
						{:else}
							{#each filmCategories as category}
								<button
									on:click={() => setActiveCategory(category)}
									class="transform hover:scale-105 transition-transform"
								>
									<FilmHolder label={category}>
										<FilmCanister title={category} />
									</FilmHolder>
								</button>
							{/each}
						{/if}
					</div>
				</div>

				<!-- Image selected -->
				{#if stickyImage || hoveredImage}
					{@const displayImage = stickyImage || hoveredImage}
					{#if displayImage}
						<div class="flex justify-end items-start mt-5">
							<div
								class="bg-neutral-900/90 p-4 rounded-xl shadow-2xl border border-neutral-700/80 flex flex-col items-center max-w-md"
							>
								<div
									class="relative -rotate-2 mb-3 transition-transform duration-300 cursor-pointer"
									on:click={() => openModal(displayImage)}
									on:keydown={(e) => e.key === 'Enter' && openModal(displayImage)}
									role="button"
									tabindex="0"
								>
									<img
										src={displayImage.source}
										alt="Selected Film"
										class="border-8 border-neutral-700/80 shadow-xl rounded-md max-w-full h-auto"
									/>
									{#if stickyImage}
										<!-- Film tape corners for sticky images -->
										<img
											src="/photography/film-tape.webp"
											alt=""
											class="absolute -top-5 -left-5 w-20 -rotate-45 opacity-80"
										/>
										<img
											src="/photography/film-tape.webp"
											alt=""
											class="absolute -bottom-5 -right-5 w-20 -rotate-45 opacity-80"
										/>
									{/if}
								</div>
								<div
									class="bg-neutral-800/80 px-4 py-2 rounded-md w-full text-center mt-1 shadow text-gray-200 font-mono text-base"
								>
									<h3 class="font-bold text-lg mb-1">{displayImage.description}</h3>
									<div class="flex gap-1 justify-center items-center">
										<MapPin size={16} />
										<p class="text-xs italic">{displayImage.location}</p>
									</div>
								</div>
							</div>
						</div>
					{/if}
				{/if}
			</div>
		</section>

		<div class="flex gap-5 md:hidden py-10 overflow-x-hidden">
			<FilmStackMobile />
		</div>

		<!-- Modal -->
		{#if modalImage}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
				on:click={closeModal}
				transition:fly={{ duration: 300, opacity: 0 }}
			>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="relative w-[60vw] max-h-[80vh]"
					on:click|stopPropagation
					on:mouseenter={() => (showModalInfo = true)}
					on:mouseleave={() => (showModalInfo = false)}
				>
					<!-- Left navigation caret -->
					{#if currentCategoryImages.length > 1 && currentImageIndex > 0}
						<button
							class="absolute left-0 top-1/2 -translate-x-16 -translate-y-1/2  opacity-70 hover:opacity-100"
							on:click={prevModalImage}
							aria-label="Previous image"
						>
							<CaretLeft size={24} />
						</button>
					{/if}

					<!-- Right navigation caret -->
					{#if currentCategoryImages.length > 1 && currentImageIndex < currentCategoryImages.length - 1}
						<button
							class="absolute right-0 top-1/2 translate-x-16 -translate-y-1/2 opacity-70 hover:opacity-100"
							on:click={nextModalImage}
							aria-label="Next image"
						>
							<CaretRight size={24} />
						</button>
					{/if}
					<img
						src={modalImage.source}
						alt={modalImage.description}
						class="w-full h-full object-contain shadow-2xl rounded-lg"
						transition:fly={{ duration: 400, y: 50, opacity: 0 }}
					/>

					<!-- Close button -->
					{#if showModalInfo}
						<button
							class="absolute -top-4 -right-4 bg-neutral-800/90 hover:bg-neutral-700/90 text-white rounded-full p-2 transition-all duration-300"
							on:click={closeModal}
							transition:fly={{ duration: 200, opacity: 0 }}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M18 6L6 18M6 6L18 18"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
								/>
							</svg>
						</button>
					{/if}

					<!-- Image info -->
					{#if showModalInfo}
						<div
							class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg transition-all duration-300"
							transition:fly={{ duration: 300, y: 20, opacity: 0 }}
						>
							<h3 class="text-white font-bold text-xl mb-1">{modalImage.description}</h3>
							<div class="flex gap-2 items-center text-gray-300">
								<MapPin size={16} />
								<p class="text-sm">{modalImage.location}</p>
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	{/if}
</main>
