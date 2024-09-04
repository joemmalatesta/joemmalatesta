type Bookmark = {
    title: string; // Tool, website, design, person, quote
    type: string;
    link?: string;
}

export const bookmarks: Bookmark[] = [
    {
        title: "Rich Harris",
        type: "person",
        link: "https://twitter.com/Rich_Harris"
    },
    {
        title: "Svelte",
        type: "tool",
        link: "https://svelte.dev"
    },
    {
        title: "Anthony Teo",
        type: "person",
        link: "https://anthonyteo.com"
    },
    {
        title: "Shots.so",
        type: "website",
        link: "https://shots.so"
    },
    {
        title: "Phosphor Icons",
        type: "tool",
        link: "https://phosphoricons.com/"
    },
    {
        title: "Guillermo Rauch",
        type: "person",
        link: "https://x.com/rauchg"
    },
    {
        title: "Tailwind",
        type: "tool",
        link: "https://tailwindcss.com"
    },
    {
        title: "SwellGarfo",
        type: "Person",
        link: "https://gar.fo"
    },
    {
        title: "Tree",
        type: "website",
        link: "https://tree.nathanfriend.io/"
    }
    
]