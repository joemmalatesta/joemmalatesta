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
</script>

<svelte:head>
	<title>About - JMM</title>
	<meta name="description" content="A closer look at who I am and aspire to be" />
</svelte:head>

<main class="min-h-screen">
	{#if ready}
		<section transition:fly={{ y: 50, duration: 600, delay: 0 }}>
			<Header title="About" description="A closer look at who I am and aspire to be" />
		</section>

		<section
			transition:fly={{ y: 50, duration: 400, delay: 200 }}
			class="flex flex-col md:flex-row justify-between relative w-full md:gap-24 gap-12 py-24 md:py-32"
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
		<section transition:fly={{ y: 50, duration: 400, delay: 400 }}>
			<div class="gap-1">
				<h3 class="text-4xl font-semibold">Bookmarks</h3>
				<p class="opacity-70">Useful tools and inspiring people</p>
				<div class="flex flex-col py-2">
					{#each bookmarks as bookmark}
						<a
							href={bookmark.link}
							target="_blank"
							class="opacity-90 hover:opacity-100 hover:bg-light/5 px-3 py-2 rounded-lg items-center duration-300 flex justify-between"
						>
							<div class="flex gap-1 items-center text-lg">
								<img src="/bookmarks/{bookmark.image}" alt={bookmark.title} class="w-6 h-6 inline" />
								{bookmark.title}
							</div>
							<div class="opacity-50 text-sm">
								{bookmark.link?.replace(/^https?:\/\//, '')}
								<img src="icons/outlink.svg" alt="outlink" class="w-4 h-4 inline" />
							</div>
						</a>
					{/each}
				</div>
			</div>
		</section>

		<!-- ADD SECTION FOR FILM PHOTOGRAPHY -->
		 <!-- ADD SECTION FOR ANILIST -->
		  <!-- ADD SECTION FOR RANDOM STUFF (Rocket League) -->
	{/if}
</main>
