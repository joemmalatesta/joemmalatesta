<script lang="ts">
	import { updates } from '$lib/timeline';
	import Timeline from '../../components/Timeline.svelte';
	import Header from '../../components/Heading.svelte';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	let ready = false;
	onMount(() => {
		ready = true;
	});
</script>

<svelte:head>
	<title>Updates - JMM</title>
	<meta name="description" content="Curious to see what I've been up to?" />
</svelte:head>

<main class="min-h-screen">
	{#if ready}
		<section transition:fly={{ y: 50, duration: 600, delay: 0 }}>
			<Header title="Updates" description="Curious to see what I've been up to?" />
		</section>

		<section
			transition:fly={{ y: 50, duration: 400, delay: 200 }}
			class="relative flex justify-between w-full gap-5 py-5"
		>
			<div class="z-50 items-center justify-center w-full mx-auto">
				{#each updates as update, index}
					<Timeline {update} {index} isLast={false} initialLoad={false} />
				{/each}
			</div>
		</section>
	{/if}
</main>
