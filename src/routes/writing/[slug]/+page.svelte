<script lang="ts">
import type { Post } from '$lib/posts';
import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import { fly } from 'svelte/transition';
	let ready = false;
	onMount(() => {
		ready = true;
	});

    export let data: PageData;
    const { metadata, post: Post } = data as { metadata: Post['metadata']; post: Post['default'] };
</script>


<main class="min-h-screen w-full flex justify-center">
{#if ready}

<article class="prose-sm prose md:prose-base lg:prose-lg prose-invert">
    <div in:fly={{ y: 50, duration: 400, delay: 0 }} class="flex flex-col">

        <p class="text-sm text-light/60">{metadata.pubDate}</p>
        <h1>{metadata.title}</h1>
    </div>
        <div in:fly={{ y: 50, duration: 400, delay: 200 }}>

        <Post />
            </div>
        </article>
    
{/if}</main>