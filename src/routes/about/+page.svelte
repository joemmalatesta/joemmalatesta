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
    
    
    <section transition:fly={{ y: 50, duration: 400, delay: 200 }} class="flex justify-between relative w-full gap-5 py-40">
        <div class="w-full z-50 mx-auto flex justify-center items-center">
            <PhotoBook bind:activePicture />
        </div>
    </section>
    {/if}

    <!-- Some inspirations here -->
     <!-- Tools, Design Inspo, Tech Inspo, Portfolio inspo -->
</main>

