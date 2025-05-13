<script lang="ts">
import { page } from '$app/stores';

let activeTab: string;

$: {
    const path = $page.url.pathname;
    if (path === '/') {
        activeTab = 'home';
    } else if (path.startsWith('/about')) {
        activeTab = 'about';
    } else if (path.startsWith('/projects')) {
        activeTab = 'projects';
    } else if (path.startsWith('/writing')) {
        activeTab = 'writing';
    } else {
        activeTab = '';
    }
}
</script>

<nav class="flex justify-between items-center py-6">
    <a href="/" class="sm:hidden"><img src="/logo-dark.svg" alt="JMM" class="w-8 h-8"></a>
	<a href="/" class="hidden sm:block text-xl">Joe Malatesta</a>
	<div class="flex gap-4">
		<a href="/about" class="relative group sm:text-lg text-sm">
			About
			<span
				class="absolute left-1/2 right-1/2 -bottom-0.5 h-0.5 bg-light transform -translate-x-1/2 transition-all duration-300 {activeTab == 'about' ? 'w-full' : 'group-hover:w-full w-0'}"
			></span>
		</a>
		<a href="/projects" class="relative group sm:text-lg text-sm">
			Projects
			<span
				class=" absolute left-1/2 right-1/2 -bottom-0.5 h-0.5 bg-light transform -translate-x-1/2 transition-all duration-300 {activeTab == 'projects' ? 'w-full' : 'group-hover:w-full w-0'}"
			></span>
		</a>
		<a href="/writing" class="relative group sm:text-lg text-sm">
			Writing
			<span
				class=" absolute left-1/2 right-1/2 -bottom-0.5 h-0.5 bg-light transform -translate-x-1/2 transition-all duration-300 {activeTab == 'writing' ? 'w-full' : 'group-hover:w-full w-0'}"
			></span>
		</a>
	</div>
</nav>
