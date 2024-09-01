type Inspiration = {
    title: string; // Tool, website, design, person, quote
    type: string;
    link?: string;
}

export const inspirations: Inspiration[] = [
    {
        title: "Rich Harris",
        type: "person",
        link: "https://huntabyte.com"
    },
    {
        title: "Svelte",
        type: "tool",
        link: "https://svelte.dev"
    },
]