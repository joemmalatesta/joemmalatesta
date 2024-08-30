<script lang="ts">
    import { projects } from '$lib/projects';
	import ProjectCard from '../../components/ProjectCard.svelte';
</script>

<h1 class="text-6xl font-semibold mb-5">Projects</h1>

<div class="flex flex-col gap-6">
    {#each projects as project}
        <ProjectCard {project} />
    {/each}
</div>
