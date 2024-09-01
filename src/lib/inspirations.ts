type Inspiration = {
    title: string; // Tool, website, design, person, quote
    type: string;
    link?: string;
}

export const inspirations: Inspiration[] = [
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
    
]