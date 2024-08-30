<script lang="ts">
	import type { TimelineItem } from '$lib/timeline';
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	export let update: TimelineItem;
    export let index: number;


    let ready = false;
    onMount(() => {
        ready = true;
    })
</script>

{#if ready}
<div class="relative pl-8 py-2 group">
	<!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) -->
	<div
		class="flex flex-col items-start mb-1 group-last:before:hidden before:absolute before:left-2 before:h-full before:px-px before:bg-light/40 before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 after:w-[.25rem] after:h-[.25rem] after:bg-light/70 after:border-[3px] after:box-content after:border-light/70 after:rounded-full after:-translate-x-1/2 after:translate-y-2"
	>
		<div in:fly={{ x: 100, duration: 300, delay: index * 150 + 500 }}>
			<time
				class="text-xs mb-2 text-light opacity-60 font-semibold"
			>{update.date}</time>
                <div class="text-xl font-semibold">{update.title}</div>
                <!-- Content -->
                 <p class="text-sm opacity-60">{update.content}</p>
        </div>
    </div>
</div>
{/if}

<!-- 		in:slide={{ axis: 'y', duration: 600, delay: index * 100 + 500 }}
 -->