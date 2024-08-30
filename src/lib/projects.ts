export type Project = {
    title: string;
    dateRange: string;
    description: string;
    image: string;
    logos: string[];
    link: string;
}

export const projects: Project[] = [
    {
        title: 'Groople',
        dateRange: '2022 - Present',
        description: 'Daily word game, 100s of users',
        image: 'groople.webp',
        logos: ["vercel.png", "tailwind.png", "svelte.png", "openAI.png"],
        link: 'https://groople.xyz'
    },
    {
        title: 'GrizzHacks',
        dateRange: 'Aug 2023 - Present',
        description: '',
        image: 'grizzhacks7.webp',
        logos: ["vercel.png", "tailwind.png", "svelte.png", "openAI.png"], 
        link: 'https://grizzhacks.org'
    },
    {
        title: 'Scanbite',
        dateRange: '2022 - Present',
        description: 'Scanbite is a tool for scanning and analyzing websites',
        image: 'scanbite.webp',
        logos: ["vercel.png", "tailwind.png", "svelte.png", "openAI.png"],
        link: 'https://scanbite.tech'
    }
]
