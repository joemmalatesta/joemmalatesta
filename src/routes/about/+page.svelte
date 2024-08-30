<script lang="ts">
  import PhotoBook from '../../components/PhotoBook.svelte';

import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
let ready = false;
	onMount(() => {
		ready = true;
	});

    let activePicture = 0;
</script>


<main class="min-h-screen">
    {#if ready}
    <section transition:fly={{ y: 50, duration: 400, delay: 0 }}>
    <h1 class="text-6xl font-semibold">About</h1>
    <p class="opacity-70">A closer look at who I am and aspire to be</p>    
    </section>
    
    
    <section transition:fly={{ y: 50, duration: 400, delay: 200 }} class="flex justify-between relative w-full gap-5 py-20">
        <div class="w-4/6 z-50 absolute right-0">
            <PhotoBook bind:activePicture />
        </div>
    </section>
    {/if}

    <!-- Some inspirations here -->
     <!-- Tools, Design Inspo, Tech Inspo, Portfolio inspo -->
</main>

