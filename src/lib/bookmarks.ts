type Bookmark = {
    title: string; // Tool, website, design, person, quote
    type: string;
    link?: string;
    image: string;
}

export const bookmarks: Bookmark[] = [
    {
        title: "Rich Harris",
        type: "people",
        link: "https://x.com/Rich_Harris",
        image: "richharris.webp"
    },
    {
        title: "Kennan Davison",
        type: "people",
        link: "https://x.com/kennandavison",
        image: "kennandavison.webp"
    },
    {
        title: "Svelte",
        type: "tools",
        link: "https://svelte.dev",
        image: "svelte.png"
    },
    {
        title: "Hyperplexed",
        type: "people",
        link: "https://youtube.com/@Hyperplexed",
        image: "hyperplexed.webp"
    },
    {
        title: "Anthony Teo",
        type: "people",
        link: "https://anthonyteo.com",
        image: "anthonyteo.png"
    },
    {
        title: "Shots.so",
        type: "tools",
        link: "https://shots.so",
        image: "shots.png"
    },
    {
        title: "Icons",
        type: "tools",
        link: "https://phosphoricons.com/",
        image: "phosphor.png"
    },
    {
        title: "Guillermo Rauch",
        type: "people",
        link: "https://x.com/rauchg",
        image: "rauchg.webp"
    },
    {
        title: "Tailwind",
        type: "tools",
        link: "https://tailwindcss.com",
        image: "tailwind.png"
    },
    {
        title: "SwellGarfo",
        type: "people",
        link: "https://gar.fo",
        image: "user.svg"
    },
    {
        title: "Tree",
        type: "tools",
        link: "https://tree.nathanfriend.io/",
        image: "tree.png"
    },
    {
        title: "Screen Studio",
        type: "tools",
        link: "https://screen.studio",
        image: "screenstudio.png"
    },
    {
        title: "Notion",
        type: "tools",
        link: "https://notion.so",
        image: "notion.png"
    },
    
]