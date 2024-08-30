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
    
    
    <section transition:fly={{ y: 50, duration: 400, delay: 200 }} class="flex w-full gap-5 py-10">
        <div class="flex flex-col gap-0.5 items-center w-2/5">

            <img src="/me.webp" class="rounded-lg " alt="Joe Malatesta">
            <div class="flex items-center justify-center gap-2 opacity-60 w-full">
                <img src="icons/map-pin.svg" class="w-4 h-4" alt="location">
                <p class="text-sm">North Beach, San Francisco</p>
            </div>
        </div>
        <div class="w-3/5 flex flex-col justify-between p-1">
            <p class="">
            Hi there! I'm Joe, a passionate developer and tech enthusiast. I love creating innovative projects and exploring new technologies. When I'm not coding, you can find me hiking, reading, or experimenting with new recipes in the kitchen.
        </p>
        <p class="">
            I'm a full stack developer with a passion for creating web and mobile applications. I'm currently working on a project that combines my love for technology and cooking.
        </p>
        <p class="">
            I'm a full stack developer with a passion for creating web and mobile applications. I'm currently working on a project that combines my love for technology and cooking.
        </p>
    </section>
    {/if}

    <!-- Some inspirations here -->
     <!-- Tools, Design Inspo, Tech Inspo, Portfolio inspo -->
</main>

