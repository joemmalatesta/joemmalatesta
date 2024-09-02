<script lang="ts">
    import { projects } from '$lib/projects';
	import { fly } from 'svelte/transition';
	import ProjectCard from '../../components/ProjectCard.svelte';
    import Header from '../../components/Heading.svelte';
    import { onMount } from 'svelte';
let ready = false;
	onMount(() => {
		ready = true;
	});
</script>

<svelte:head>
	<title>Projects - JMM</title>
	<meta name="description" content="Blood, sweat, and carpal tunnel has led me to this" />
</svelte:head>

<main class="min-h-screen">
{#if ready}
<div class="flex flex-col gap-2 mb-5" in:fly={{ y: 50, duration: 600, delay: 0 }}>
    <Header title="Projects" description="Blood, sweat, and carpal tunnel has led me to this" />
</div>

<div class="flex flex-col gap-10 sm:gap-2" in:fly={{ y: 50, duration: 400, delay: 200 }}>
    {#each projects as project, index}
            <ProjectCard {project} />
    {/each}
</div>
{/if}
</main>

