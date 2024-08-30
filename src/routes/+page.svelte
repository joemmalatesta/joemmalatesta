<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Timeline from '../components/Timeline.svelte';
	import { projects } from '$lib/projects';
	import ProjectCard from '../components/ProjectCard.svelte';
	import { updates } from '../lib/timeline';
	let ready = false;
	onMount(() => {
		ready = true;
	});
</script>

<main class="min-h-screen">
	{#if ready}
		<!-- About section -->
		<section transition:fly={{ y: 50, duration: 400, delay: 0 }} class="py-5">
			<h1 class="text-6xl font-semibold text-indigo-300">Joe Malatesta</h1>

			<div class="" transition:fly={{ y: 50, duration: 400, delay: 100 }}>
				<p>I'm a full stack developer and full time student focused on constantly learning and improving in all apsects of my life. Initally introduced by automation software in highschool, I've learned many types of development languages and tools and continue to do so in work, school, and hobby every single day.
                </p>
			</div>
		</section>

		<!-- Updates timeline -->
		<section transition:fly={{ y: 50, duration: 400, delay: 400 }} class="py-5">
			<h2 class="text-3xl font-medium text-indigo-300">Updates</h2>
			{#each updates as update, index}
				<Timeline {update} {index} />
			{/each}
		</section>

		<!-- Projects section -->
		<section transition:fly={{ y: 50, duration: 400, delay: 1000 }} class="py-5">
			<a href="/projects" class="text-3xl font-medium py-2 text-indigo-300">Projects</a>
			<div class="flex flex-col gap-6">
				{#each projects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		</section>
	{/if}
</main>
