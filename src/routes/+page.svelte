<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import Timeline from '../components/Timeline.svelte';
	import { projects } from '$lib/projects';
	import ProjectCard from '../components/ProjectCard.svelte';
	import { updates } from '../lib/timeline';
	import type { PageData } from './$types';
	let ready: boolean = false;
	let isNavigatingFrom: boolean = false;

	onMount(() => {
		ready = true;
	});

	// See if this is initial page load or not. If not, we want it to be snappier and will change delays accordingly
	$: isNavigatingFrom = $navigating?.from?.url.pathname !== undefined;

	// Get all posts from /lib/posts
	export let data: PageData;
	const { allPostInfo } = data as { allPostInfo: any[] };
</script>

<svelte:head>
	<title>Joe Malatesta</title>
	<meta name="description" content="Joe Malatesta's Portfolio" />
</svelte:head>

<main class="min-h-screen">
	{#if ready}
		<!-- Intro section -->
		<section transition:fly={{ y: 50, duration: 600, delay: 0 }} class="py-10">
			<!-- Silly phrase. change this at some point -->
			<div class="pb-4">
				<h1 class="text-5xl sm:text-7xl font-bold tracking-tight">
					Developing for fun. <span class="font-light">Thoroughly curious.</span>
				</h1>
			</div>
			<p class="opacity-70 sm:text-base text-sm">
				I'm a full stack developer and full time student focused on constant improvement in all
				aspects of my life. I've spent the last few summers teaching and building software, and the
				last few winters growing the next generation of engineers. want to know even more <a
					href="/about"
					class="underline underline-offset-2 hover:underline-offset-4 transition-all duration-300"
					>about me?</a
				>
			</p>
		</section>

		<!-- Updates timeline -->
		<section id="updates" transition:fly={{ y: 50, duration: 400, delay: 250 }} class="py-10">
			<a
				href="/updates"
				class="text-2xl sm:text-3xl font-extralight py-2 group flex gap-1 items-center border-b-2 border-light/10 relative"
			>
				Updates
				<img
					src="icons/arrow-right.svg"
					class="w-6 h-6 group-hover:translate-x-2 transition-all duration-300"
					alt="arrow right"
				/>
			</a>
			{#each updates.slice(0, 4) as update, index}
				<Timeline initialLoad={!isNavigatingFrom} {update} {index} isLast={index === 3} />
			{/each}
		</section>

		<!-- Projects section -->
		<section
			transition:fly={{ y: 50, duration: 400, delay: isNavigatingFrom ? 200 : 1000 }}
			class="py-10"
		>
			<a
				href="/projects"
				class="text-2xl sm:text-3xl font-extralight py-2 group flex gap-1 items-center border-b-2 border-light/10 relative"
			>
				Projects
				<img
					src="icons/arrow-right.svg"
					class="w-6 h-6 group-hover:translate-x-2 transition-all duration-300"
					alt="arrow right"
				/>
			</a>
			<div class="flex flex-col gap-10 sm:gap-2 pt-3">
				{#each projects.slice(0, 3) as project}
					<ProjectCard {project} />
				{/each}
			</div>
		</section>

		<!-- Writing section -->
		<section id="writing" transition:fly={{ y: 50, duration: 400, delay: 200 }} class="py-10">
			<a
				href="/writing"
				class="relative text-2xl sm:text-3xl font-extralight py-2 group flex gap-1 items-center border-b-2 border-light/10"
			>
				<p>Writing</p>
				<img
					src="icons/arrow-right.svg"
					class="w-6 h-6 group-hover:translate-x-2 transition-all duration-300"
					alt="arrow right"
				/>
			</a>
			{#each allPostInfo as post, index}
				<a
					class="flex justify-between items-center w-full py-2 xl:py-3 opacity-70 md:opacity-50 md:hover:opacity-100 transition-all"
					target={post.external ? '_blank' : ''}
					href={post.external ? post.url : `/writing/${post.slug}/`}
				>
					<div class="flex gap-1 items-center w-5/6">
						<h4 class="text-base md:text-xl truncate">{post.title}</h4>
						{#if post.external}
							<img src="icons/outlink.svg" class="w-4 lg:w-5 h-4 lg:h-5" alt="external link" />
						{/if}
					</div>

					<div class="sm:text-sm text-xs flex gap-2 items-center">
						<p class="hidden sm:block">
							{new Date(post.pubDate).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</p>
						<p class="sm:hidden">
							{new Date(post.pubDate).toLocaleDateString('en-US', {
								year: '2-digit',
								month: '2-digit',
								day: '2-digit'
							})}
						</p>
						<!-- <img src="icons/arrow-right.svg" class="w-6 h-6 group-hover:translate-x-2 transition-all duration-300" alt="arrow right" /> -->
					</div>
				</a>
			{/each}
		</section>

		<!-- Contact section -->
		<section id="contact" transition:fly={{ y: 50, duration: 400, delay: 400 }} class="py-10">
			<h3
				class="relative text-3xl font-extralight group flex items-center border-b-2 border-light/10 py-2"
			>
				Let's chat
			</h3>
			<p class="opacity-70 pt-1 sm:text-base text-sm">
				I wanna see what you're working on! Reach me at <a
					href="mailto:joemmalatesta@gmail.com"
					class="underline underline-offset-2 hover:underline-offset-4 transition-all duration-300"
					>joemmalatesta@gmail.com</a
				>,
				<a
					target="_blank"
					class="underline underline-offset-2 hover:underline-offset-4 transition-all duration-300"
					href="https://x.com/joemmalatesta">joemmalatesta</a
				>
				on twitter, or ask me anything on my
				<a
					class="underline underline-offset-2 hover:underline-offset-4 transition-all duration-300"
					href="/QnA">QnA</a
				>.
				<div class="flex items-center gap-2 pt-2">
					<p class="opacity-70 sm:text-base text-sm">You can also talk to "me" on the phone</p>
					<form class="flex items-center" method="post">
						<input 
						type="tel"
						placeholder="(555) 555-5555"
						name="phone"
						class="bg-light/10 rounded-l-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-light/20 focus:bg-light/10 text-sm"
					/>
					<button class="bg-light/20 hover:bg-light/30 rounded-r-lg px-3 py-1 transition-colors duration-200 focus:bg-light/20 active:bg-light/20 text-sm">
						Call me
					</button>
				</form>
			</div>
		</section>
	{/if}
</main>
