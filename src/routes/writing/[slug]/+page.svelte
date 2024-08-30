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


<main class="min-h-screen">
{#if ready}
<p in:fly={{ y: 50, duration: 400, delay: 0 }} class="text-sm text-light/60">{metadata.pubDate}</p>
<article class="prose prose-invert">
    <h1 in:fly={{ y: 50, duration: 400, delay: 0 }}>{metadata.title}</h1>
    <div in:fly={{ y: 50, duration: 400, delay: 200 }}>

        <Post />
            </div>
        </article>
    
{/if}</main>