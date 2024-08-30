import type { ComponentType } from "svelte";
import type { PageLoad } from "./$types";
import type { Post } from '$lib/posts';
import { getAllPostInfo } from '$lib/posts';


export const load: PageLoad = async ({ }) => {
    
    try {
        const allPostInfo = await getAllPostInfo();
        return {
            allPostInfo
        };
    } catch (e) {
        console.error(e);
    }
};