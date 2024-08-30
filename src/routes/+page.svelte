<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
    import Timeline from '../components/Timeline.svelte';
	let ready = false;
	onMount(() => {
		ready = true;
	});
</script>


<main>
	<h1 class="text-6xl font-semibold text-indigo-300">Joe Malatesta</h1>
	{#if ready}
		<div class="" transition:fly={{ y: 50, duration: 600 }}>
			<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
		</div>

        <!-- Updates timeline -->
        <section class="py-5">
            <h2 class="text-4xl font-semibold py-2">Updates</h2>
            <Timeline />
        </section>
	{/if}
</main>
