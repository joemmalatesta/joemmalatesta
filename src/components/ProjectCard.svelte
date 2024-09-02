<script lang="ts">
    import type { Project } from '$lib/projects';
	export let project: Project;
</script>

<a href={project.link} target="_blank" class="group flex flex-col sm:flex-row w-full items-center hover:opacity-100 transition-all duration-300 sm:gap-8 sm:p-4 hover:bg-light/5 hover:ring-2 ring-light/10 rounded-lg">
	<!-- Details -->
	<div class="w-full sm:w-1/2 flex flex-col gap-2 mb-4 sm:mb-0">
		<p class="text-sm opacity-50 hidden sm:block">{project.dateRange}</p>
		<div class="flex gap-1 flex-col items-start">
			<h2 class="text-2xl sm:text-3xl font-semibold">{project.title}</h2>
			<a href={project.link} target="_blank" class="gap-2 items-center text-xs opacity-40 transition-all sm:hidden flex">
				<p class="">{project.dateRange}</p>
				<p>/</p>
				<p>{project.link.replace('https://', '')}</p>
				<img src="/icons/outlink.svg" alt="External Link" class="w-4" />

			</a>

		</div>
		<p class="text-sm md:text-base">{project.description}</p>

			<a href={project.link} target="_blank" class="hidden sm:flex gap-1 items-center opacity-50 transition-all text-sm">
				<p class="font-light">{project.link.replace('https://', '')}</p>
				<img src="/icons/outlink.svg" alt="External Link" class="w-4" />

			</a>

	</div>
	<!-- Image -->
	<div class="relative transition-all duration-300 group w-full sm:w-1/2 group-hover:scale-105">
		<img src="projects/{project.image}" alt={project.title} class="rounded-lg object-cover w-full" />
		<!-- <img src="/logos/{project.logos[0]}" alt="" class="hidden sm:block group-hover:-translate-x-7 group-hover:translate-y-7 group-hover:opacity-100 group-hover:rotate-12 rotate-0 opacity-0 absolute w-8 md:w-10 transition-all duration-300" style="bottom: 0; left: 0">
		<img src="/logos/{project.logos[1]}" alt="" class="hidden sm:block group-hover:translate-x-7 group-hover:translate-y-7 group-hover:opacity-100 group-hover:-rotate-12 rotate-0 opacity-0 absolute w-8 md:w-10 transition-all duration-300" style="bottom: 0; right: 0">
		<img src="/logos/{project.logos[2]}" alt="" class="hidden sm:block group-hover:translate-x-7 group-hover:-translate-y-7 group-hover:opacity-100 group-hover:rotate-12 rotate-0 opacity-0 absolute w-8 md:w-10 transition-all duration-300" style="top: 0; right: 0">
		<img src="/logos/{project.logos[3]}" alt="" class="hidden sm:block group-hover:-translate-x-7 group-hover:-translate-y-7 group-hover:opacity-100 group-hover:-rotate-12 rotate-0 opacity-0 absolute w-8 md:w-10 transition-all duration-300" style="top: 0; left: 0"> -->
	</div>
</a>



