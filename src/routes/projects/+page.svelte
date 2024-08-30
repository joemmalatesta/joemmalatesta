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
<h1 in:fly={{ y: 50, duration: 400, delay: 0 }} class="text-6xl font-semibold mb-5">Projects</h1>

<div class="flex flex-col gap-6" in:fly={{ y: 50, duration: 400, delay: 200 }}>
    {#each projects as project, index}
            <ProjectCard {project} />
    {/each}
</div>
{/if}
</main>

