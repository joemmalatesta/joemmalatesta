<script lang="ts">
import { page } from '$app/stores';
import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';

	function openSearch() {
		window.dispatchEvent(
			new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
		);
	}

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
    <a href="/" class="sm:hidden"><img src="/logo-light.svg" alt="JMM" class="w-8 h-8"></a>
	<a href="/" class="hidden sm:block text-xl">Joe Malatesta</a>
	<div class="flex items-center gap-4">
		<button
			type="button"
			on:click={openSearch}
			class="flex items-center gap-1.5 rounded-lg bg-light/5 px-2 py-1 text-light/70 hover:bg-light/10"
			aria-label="Search"
		>
			<MagnifyingGlass size={16} />
			<kbd class="hidden text-[11px] text-light/40 sm:inline">⌘K</kbd>
		</button>
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
