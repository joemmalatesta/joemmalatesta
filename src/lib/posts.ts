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
            return { title: metadata.title, pubDate: metadata.pubDate, slug, external: false, url: `/writing/${slug}` };
        })
    );

    // Add external blog post
    allPosts.push({
        title: "Everyone Needs to Know How to Trace",
        pubDate: "2024-08-27",
        slug: "everyone-needs-to-know-how-to-trace",
        external: true,
        url: "https://blog.sentry.io/everyone-needs-to-know-how-to-trace/"
    });
    // Add another external blog post
    allPosts.push({
        title: "Debugging Slow Pages Caused by Slow Backends",
        pubDate: "2024-07-17",
        slug: "debugging-slow-pages-caused-by-slow-backends",
        external: true,
        url: "https://blog.sentry.io/debugging-slow-pages-caused-by-slow-backends/"
    });

    // Sort posts by date in ascending order (oldest first)
    const sortedPosts = allPosts.sort(
        (a, b) => new Date(a.pubDate).valueOf() - new Date(b.pubDate).valueOf()
    );

    return sortedPosts;
}
