<script lang="ts">
	import type { TimelineItem } from '$lib/timeline';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	export let update: TimelineItem;
    export let index: number;
    export let isLast: boolean;
	export let initialLoad: boolean;

	let ready = false;
	onMount(() => {
		ready = true;
	})
</script>

{#if ready}
<div class="relative pl-8 py-2 group">
	<!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) -->
	<div
		class="flex flex-col items-start mb-1 group-last:before:hidden before:absolute before:left-2 before:h-full before:px-px before:bg-[#717171] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 after:w-[.25rem] after:h-[.25rem] after:bg-light/60 after:border-[4px] after:border-light/60 after:rounded-full after:-translate-x-1/2 after:translate-y-2"
	>
		<div in:fly={{ x: 50, duration: initialLoad ? 300 : 200, delay: initialLoad ? index * 150 + 300 : index * 100 + 200 }}>
			<time
				class="text-xs mb-2 text-light opacity-60 font-semibold"
			>{update.date}</time>
                <div class="text-xl font-semibold">{update.title}</div>
                <!-- Content -->
                 <p class="text-sm opacity-60">{update.content}</p>
        </div>
		<!-- Using bg-light/40 fucked things up so I'm just using #717171 bc it's close and doesn't have a weird overlap -->
		{#if isLast}
    <div 
        class="absolute left-[.45rem] bottom-0 w-[2px] h-28 sm:h-24 bg-gradient-to-b from-[#717171] via-light/20 to-transparent" 
        in:fade={{ duration: 300, delay: (index + 1) * 150 + 300 }}
    ></div>
{/if}
    </div>
	
</div>


{/if}

