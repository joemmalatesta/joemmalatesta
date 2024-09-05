<script lang="ts">
	import PhotoBook from '../../components/PhotoBook.svelte';
	import Header from '../../components/Heading.svelte';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { bookmarks } from '../../lib/bookmarks';
	let ready = false;
	onMount(() => {
		ready = true;
	});

	let smallScreen: boolean;
	let activePicture = 0;
	let pictureText: string;
	$: switch (activePicture) {
		case 0:
			pictureText = 'spent a summer exploring San Francisco.';
			break;
		case 1:
			pictureText = 'have been practicing hand stands for the last 2 years.';
			break;
		case 2:
			pictureText = 'rebooted and ran my schools hackathon from 2023-2025.';
			break;
		case 3:
			pictureText = 'want to see all the world has to offer.';
			break;
	}

	// Bookmark section
	let bookmarkType = 'people';
</script>

<svelte:head>
	<title>About - JMM</title>
	<meta name="description" content="A closer look at who I am and aspire to be" />
</svelte:head>

<main class="min-h-screen overflow-x-hidden sm:overflow-visible	">
	{#if ready}
		<section transition:fly={{ y: 50, duration: 600, delay: 0 }}>
			<Header title="About" description="A closer look at who I am and aspire to be" />
		</section>

		<section
			transition:fly={{ y: 50, duration: 400, delay: 200 }}
			class="flex flex-col md:flex-row justify-between relative w-full md:gap-24 gap-12 pt-24 md:pt-32 pb-10"
		>
			<div class="z-50 mx-auto flex justify-center items-center lg:-translate-x-20">
				<PhotoBook bind:activePicture bind:smallScreen />
			</div>
			<div
				class="opacity-90 text-[.95rem] gap-4 sm:gap-6 pt-5 md:pt-0 flex flex-col sm:w-1/2 w-full"
			>
				Hey, I'm Joe 😸
				<p>
					I'm a developer and aspiring designer passionate in simplifying user interactions and
					building communities of engineers.
				</p>
				<p>
					As much as I love rotting in front of a screen, my childhood was 100% outdoors and you'll
					still catch me traveling, surfing, and playing tennis any chance I get.
				</p>
				<p>
					Oh, and I also {#key activePicture}<span
							out:fade={{ duration: 200 }}
							in:fade={{ delay: smallScreen ? 400 : 300, duration: 200 }}
							class="">{pictureText}</span
						>{/key}
				</p>
			</div>
		</section>

		<!-- Tools, Design, Tech, Portfolio Inspiration -->
		<section class="py-10" transition:fly={{ y: 50, duration: 400, delay: 400 }}>
			<div class="gap-1">
				<h3 class="text-4xl font-semibold">Bookmarks</h3>
				<p class="opacity-70">Useful tools and inspiring people</p>
				<div class="gap-2 flex py-2">
					{#each ['people', 'tools', 'websites'] as type}
						<button
							on:click={() => {
								bookmarkType = type;
							}}
							class="text-sm opacity-50 hover:opacity-100 rounded p-1 px-3 bg-light/10 {bookmarkType === type ? 'opacity-100' : ''}"
							>{type}</button
						>
					{/each}
				</div>

				{#key bookmarkType}
					<div
						class="flex flex-col py-2"
					>
						{#each bookmarks as bookmark}
							{#if bookmark.type === bookmarkType}
								<a
									href={bookmark.link}
									target="_blank"
									class="opacity-90 hover:opacity-100 hover:bg-light/5 sm:px-3 py-2 rounded-lg items-center duration-300 flex justify-between"
								>
									<div class="flex gap-1 items-center text-base sm:text-lg">
										<img
											src="/bookmarks/{bookmark.image}"
											alt={bookmark.title}
											class="w-5 h-5 sm:w-6 sm:h-6 inline"
										/>
										{bookmark.title}
									</div>
									<div class="opacity-50 text-sm">
										{bookmark.link?.replace(/^https?:\/\//, '')}
										<img src="icons/outlink.svg" alt="outlink" class="w-4 h-4 inline" />
									</div>
								</a>
							{/if}
						{/each}
					</div>
				{/key}
			</div>
		</section>

		<!-- SECTION FOR FILM PHOTOGRAPHY -->
		 <!-- todo: update with new scans when done -->
		<section class="gap-1 py-10" transition:fly={{ y: 50, duration: 400, delay: 600 }}>
			<h3 class="text-4xl font-semibold">Film Gallery</h3>
			<p class="opacity-70">I've got a film camera. I take pictures when I remember it.</p>
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full py-2">
				{#each ['birthday', 'brown', 'camerastore', 'concert', 'dancy', 'fishpic', 'grossy', 'mother', 'summercamp'] as picture}
					<img src="photography/{picture}.webp" alt="film" class="w-full h-40 object-cover rounded-lg ring-2 ring-light/10" />
				{/each}
			</div>
		</section>
		<!-- ADD SECTION FOR ANILIST -->
		 <!-- HELL NAH DONT DO THAT -->
	{/if}
</main>