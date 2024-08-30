<script lang="ts">
    import type { Project } from '$lib/projects';
	export let project: Project;
</script>

<a href={project.link} target="_blank" class="flex flex-col sm:flex-row w-full items-center opacity-70 hover:opacity-100 transition-all">
	<!-- Details -->
	<div class="w-full sm:w-1/2 flex flex-col gap-2 mb-4 sm:mb-0">
		<p class="text-sm opacity-50">{project.dateRange}</p>
		<div class="flex gap-2 items-center">
			
			<h2 class="text-3xl font-medium">{project.title}</h2>
			<img src="/icons/outlink.svg" alt="External Link" class="w-4 md:w-6" />
		</div>
		<p class="opacity-80">{project.description}</p>
	</div>
	<!-- Image -->
	<div class="relative sm:scale-95 sm:hover:scale-105 transition-all duration-300 group w-full sm:w-1/2">
		<img src="projects/{project.image}" alt={project.title} class="rounded-lg object-cover w-full" />
		<img src="/logos/{project.logos[0]}" alt="" class="hidden sm:block group-hover:-translate-x-7 group-hover:translate-y-7 group-hover:opacity-100 group-hover:rotate-12 rotate-0 opacity-0 absolute w-8 md:w-10 transition-all duration-300" style="bottom: 0; left: 0">
		<img src="/logos/{project.logos[1]}" alt="" class="hidden sm:block group-hover:translate-x-7 group-hover:translate-y-7 group-hover:opacity-100 group-hover:-rotate-12 rotate-0 opacity-0 absolute w-8 md:w-10 transition-all duration-300" style="bottom: 0; right: 0">
		<img src="/logos/{project.logos[2]}" alt="" class="hidden sm:block group-hover:translate-x-7 group-hover:-translate-y-7 group-hover:opacity-100 group-hover:rotate-12 rotate-0 opacity-0 absolute w-8 md:w-10 transition-all duration-300" style="top: 0; right: 0">
		<img src="/logos/{project.logos[3]}" alt="" class="hidden sm:block group-hover:-translate-x-7 group-hover:-translate-y-7 group-hover:opacity-100 group-hover:-rotate-12 rotate-0 opacity-0 absolute w-8 md:w-10 transition-all duration-300" style="top: 0; left: 0">
	</div>
</a>
