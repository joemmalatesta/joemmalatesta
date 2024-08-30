<script lang="ts">
    import type { Project } from '$lib/projects';
	export let project: Project;
</script>

<a href={project.link} target="_blank" class="flex flex-col md:flex-row w-full items-center">
	<!-- Details -->
	<div class="w-full md:w-1/2 flex flex-col gap-2 mb-4 md:mb-0">
		<p class="text-sm opacity-50">{project.dateRange}</p>
		<h2 class="text-3xl font-medium">{project.title}</h2>
		<p class="opacity-80">{project.description}</p>
	</div>
	<!-- Image -->
	<div class="relative md:scale-95 md:hover:scale-105 transition-all duration-300 group w-full md:w-1/2">
		<img src="projects/{project.image}" alt={project.title} class="rounded-lg object-cover w-full" />
		<img src="/logos/{project.logos[0]}" alt="" class="hidden md:block group-hover:-translate-x-7 group-hover:translate-y-7 group-hover:opacity-100 group-hover:rotate-12 rotate-0 opacity-0 absolute w-10 transition-all duration-300" style="bottom: 0; left: 0">
		<img src="/logos/{project.logos[1]}" alt="" class="hidden md:block group-hover:translate-x-7 group-hover:translate-y-7 group-hover:opacity-100 group-hover:-rotate-12 rotate-0 opacity-0 absolute w-10 transition-all duration-300" style="bottom: 0; right: 0">
		<img src="/logos/{project.logos[2]}" alt="" class="hidden md:block group-hover:translate-x-7 group-hover:-translate-y-7 group-hover:opacity-100 group-hover:rotate-12 rotate-0 opacity-0 absolute w-10 transition-all duration-300" style="top: 0; right: 0">
		<img src="/logos/{project.logos[3]}" alt="" class="hidden md:block group-hover:-translate-x-7 group-hover:-translate-y-7 group-hover:opacity-100 group-hover:-rotate-12 rotate-0 opacity-0 absolute w-10 transition-all duration-300" style="top: 0; left: 0">
	</div>
</a>
