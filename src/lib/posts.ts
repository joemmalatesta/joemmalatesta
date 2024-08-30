import { browser } from "$app/environment";
import type { ComponentType } from "svelte";

export type Post = {
    metadata: {
    title: string;
    description: string;
    pubDate: string;
    };
    default: ComponentType;
};

export async function getAllPostInfo(): Promise<{ title: string; pubDate: string; slug: string; }[]> {
    const allPostFiles = import.meta.glob('./posts/*.md');
    const iterablePostFiles = Object.entries(allPostFiles);
    
    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = await resolver() as Post;
            const slug = path.split('/').pop()!.replace('.md', '');
            return { title: metadata.title, pubDate: metadata.pubDate, slug };
        })
    );

    // Sort posts by date in ascending order (oldest first)
    const sortedPosts = allPosts.sort(
        (a, b) => new Date(a.pubDate).valueOf() - new Date(b.pubDate).valueOf()
    );

    return sortedPosts;
}
