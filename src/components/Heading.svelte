<script lang="ts">
	import { onMount } from "svelte";

	let ready = false;
	onMount(() => {
		ready = true;
	});

    export let title: string;
    export let description: string;
</script>

{#if ready}
<div class="pt-10">


<h1 class="text-5xl sm:text-6xl font-semibold">{title}</h1>
<p class="opacity-70">{description}</p>
</div>
{/if}