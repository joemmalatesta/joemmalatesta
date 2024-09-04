type Bookmark = {
    title: string; // Tool, website, design, person, quote
    type: string;
    link?: string;
    image: string;
}

export const bookmarks: Bookmark[] = [
    {
        title: "Rich Harris",
        type: "person",
        link: "https://x.com/Rich_Harris",
        image: "user.svg"
    },
    {
        title: "Svelte",
        type: "tool",
        link: "https://svelte.dev",
        image: "svelte.png"
    },
    {
        title: "Anthony Teo",
        type: "person",
        link: "https://anthonyteo.com",
        image: "anthonyteo.png"
    },
    {
        title: "Shots.so",
        type: "website",
        link: "https://shots.so",
        image: "shots.png"
    },
    {
        title: "Icons",
        type: "tool",
        link: "https://phosphoricons.com/",
        image: "phosphor.png"
    },
    {
        title: "Guillermo Rauch",
        type: "person",
        link: "https://x.com/rauchg",
        image: "user.svg"
    },
    {
        title: "Tailwind",
        type: "tool",
        link: "https://tailwindcss.com",
        image: "tailwind.png"
    },
    {
        title: "SwellGarfo",
        type: "person",
        link: "https://gar.fo",
        image: "user.svg"
    },
    {
        title: "Tree",
        type: "tool",
        link: "https://tree.nathanfriend.io/",
        image: "tree.png"
    },
    {
        title: "Screen Studio",
        type: "tool",
        link: "https://screen.studio",
        image: "screenstudio.png"
    },
    {
        title: "Notion",
        type: "tool",
        link: "https://notion.so",
        image: "notion.png"
    },
    
]