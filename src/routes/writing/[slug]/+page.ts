import type { ComponentType } from 'svelte';
import type { PageLoad } from './$types';
import type { Post } from '$lib/posts';


export const load: PageLoad = async ({ params }) => {
    const slug = await params.slug;
    const post: Post = await import(`../../../lib/posts/${slug}.md`);

    return {
        metadata: post.metadata,
        post: post.default
    };
};