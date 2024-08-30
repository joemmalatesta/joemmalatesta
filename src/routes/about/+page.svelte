<script lang="ts">
import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
let ready = false;
	onMount(() => {
		ready = true;
	});
</script>


<main class="min-h-screen">
    {#if ready}
    <section transition:fly={{ y: 50, duration: 400, delay: 0 }}>
    <h1 class="text-6xl font-semibold">It's me, Joe!</h1>
    <p>This shall get more personal</p>    
    </section>
    
    
    <section transition:fly={{ y: 50, duration: 400, delay: 200 }} class="flex w-full gap-2 py-10">
        <img src="/me.webp" class="w-2/5 rounded-lg shadow-md" alt="Joe Malatesta">
        <p class="w-1/2 text-lg">
            Hi there! I'm Joe, a passionate developer and tech enthusiast. I love creating innovative projects and exploring new technologies. When I'm not coding, you can find me hiking, reading, or experimenting with new recipes in the kitchen.
        </p>
    </section>
    {/if}

    <!-- Some inspirations here -->
     <!-- Tools, Design Inspo, Tech Inspo, Portfolio inspo -->
</main>

