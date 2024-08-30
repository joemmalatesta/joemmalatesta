import type { ComponentType } from "svelte";
import type { PageLoad } from "./$types";
import type { Post } from '$lib/posts';
import { getAllPostInfo } from '$lib/posts';


export const load: PageLoad = async ({ }) => {
    
    try {
        const allPostInfo = await getAllPostInfo();
        return {
            allPostInfo: allPostInfo.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 4)
        };
    } catch (e) {
        console.error(e);
    }
};