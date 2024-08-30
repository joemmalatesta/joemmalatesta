<script lang="ts">
    import { projects } from '$lib/projects';
	import { fly } from 'svelte/transition';
	import ProjectCard from '../../components/ProjectCard.svelte';
    import { onMount } from 'svelte';
let ready = false;
	onMount(() => {
		ready = true;
	});
</script>


<main class="min-h-screen">
{#if ready}
<div class="flex flex-col gap-2 mb-5" in:fly={{ y: 50, duration: 400, delay: 0 }}>

    <h1 class="text-6xl font-semibold">Projects</h1>
    <p class="opacity-70">Blood, sweat, and carpal tunnel has led me to this</p>
</div>

<div class="flex flex-col gap-6" in:fly={{ y: 50, duration: 400, delay: 200 }}>
    {#each projects as project, index}
            <ProjectCard {project} />
    {/each}
</div>
{/if}
</main>

