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
        description: 'Word game peaking at 50 daily active users',
        image: 'groople.webp',
        logos: ["vercel.svg", "tailwind.png", "svelte.png", "openAI.png"],
        link: 'https://groople.xyz'
    },
    {
        title: 'GrizzHacks',
        dateRange: 'Aug 2023 - Present',
        description: 'Initiated reboot, directed a team of 12, and handled all things development',
        image: 'grizzhacks7.webp',
        logos: ["vercel.svg", "tailwind.png", "svelte.png", "openAI.png"], 
        link: 'https://grizzhacks.org'
    },
    {
        title: 'Scanbite',
        dateRange: '2022 - Present',
        description: 'First place at Hack Dearborn',
        image: 'scanbite.webp',
        logos: ["vercel.svg", "tailwind.png", "svelte.png", "openAI.png"],
        link: 'https://scanbite.tech'
    },

]
