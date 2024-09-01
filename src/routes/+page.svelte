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

<main class="min-h-screen">
	{#if ready}
		<!-- About section -->
		<section transition:fly={{ y: 50, duration: 400, delay: 0 }} class="py-5">
			<h1 class="text-6xl font-semibold text-indigo-300 font-serif">Joe Malatesta</h1>

			<div class="" transition:fly={{ y: 50, duration: 400, delay: 100 }}>
				<p>
					I'm a <span class="text-indigo-300">full stack developer</span> and
					<span class="text-indigo-300">full time student</span> focused on constantly learning and improving
					in all apsects of my life. Initally introduced by automation software in highschool, I've learned
					many types of development languages and tools and continue to do so in work, school, and hobby
					every single day.
				</p>
			</div>
		</section>

		<!-- Updates timeline -->
		<section id="updates" transition:fly={{ y: 50, duration: 400, delay: 250 }} class="py-10">
			<a
				href="/updates"
				class="text-3xl font-light py-2 group flex gap-1 items-center border-b-2 border-light/10 relative font-serif"
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
				class="text-3xl py-2 group flex gap-1 items-center border-b-2 border-light/10"
			>
				<p class="font-serif">Projects</p>
				<img
					src="icons/arrow-right.svg"
					class="w-6 h-6 group-hover:translate-x-2 transition-all duration-300"
					alt="arrow right"
				/>
			</a>
			<div class="flex flex-col gap-6 pt-3">
				{#each projects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		</section>

		<!-- Writing section -->
		<section id="writing" transition:fly={{ y: 50, duration: 400, delay: 200 }} class="py-5">
			<a
				href="/writing"
				class="relative text-3xl font-light font-serif py-2 group flex gap-1 items-center border-b-2 border-light/10"
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
					<div class="flex gap-2 items-center w-5/6">
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
		<section id="contact" transition:fly={{ y: 50, duration: 400, delay: 400 }} class="py-5">
			<p
				class="relative text-3xl font-light py-2 group flex gap-1 items-center border-b-2 border-light/10 font-serif"
			>
				Contact
			</p>
			<form class="mt-4 flex flex-col gap-4">
				<div class="flex flex-col">
					<label for="email" class="mb-1 text-sm opacity-70">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						class="bg-light/10 border border-light/30 rounded-md px-3 py-2 focus:outline-none focus:border-light/60 transition-colors"
					/>
				</div>
				<div class="flex flex-col">
					<label for="message" class="mb-1 text-sm opacity-70">Message</label>
					<textarea
						id="message"
						name="message"
						rows="4"
						required
						class="bg-light/10 border border-light/30 rounded-md px-3 py-2 focus:outline-none focus:border-light/60 transition-colors resize-none"
					></textarea>
				</div>
				<button
					type="submit"
					class="bg-light text-dark font-semibold py-2 px-4 rounded-md hover:bg-light/90 transition-colors self-start"
				>
					Send Message
				</button>
			</form>
		</section>
	{/if}
</main>
