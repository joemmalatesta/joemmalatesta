export type Project = {
	title: string;
	dateRange: string;
	description: string;
	image: string;
	logos?: string[];
	link: string;
};

export const projects: Project[] = [
	{
		title: 'Groople',
		dateRange: 'Apr 2023 - Dec 2023',
		description: 'Daily word game, evaluating answers with AI. Peaked at ~100 daily active users',
		image: 'groople.webp',
		logos: ['vercel.svg', 'tailwind.png', 'svelte.png', 'openAI.png'],
		link: 'https://groople.xyz'
	},
	{
		title: 'GrizzHacks',
		dateRange: 'Aug 2023 - Present',
		description: 'Initiated reboot, directed a team of 12, and handled all things development',
		image: 'grizzhacks7.webp',
		logos: ['vercel.svg', 'tailwind.png', 'svelte.png', 'openAI.png'],
		link: 'https://grizzhacks.org'
	},
	{
		title: 'Scanbite',
		dateRange: 'Oct 2023',
		description: 'First place at Hack Dearborn and 225k views on TikTok',
		image: 'scanbite.webp',
		logos: ['vercel.svg', 'tailwind.png', 'svelte.png', 'openAI.png'],
		link: 'https://devpost.com/software/snapbite'
	},
	{
		title: 'Scattergories List Generator',
		dateRange: 'March 2023',
		description: 'A remake of a Scattergories List Generator using SvelteKit and Tailwind',
		link: 'https://infinite.groople.xyz',
		image: 'ScatterList.webp'
	},
    {
        title: 'Osumon',
        description: "Pokéfy your osu! account. Leveraged it's 500 users to write my first blog post for Sentry",
        link: 'https://osumon.vercel.app',
        dateRange: 'June 2024',
        image: 'osumon.webp',
        logos: ['svelte.png', 'tailwind.png', 'vercel.svg', 'openAI.png']
    },
    {
        title: 'Pikart',
        description: 'A browser drawing app with all the useless shit ripped out. My capstone project',
        link: 'https://pikart-kappa.vercel.app',
        dateRange: 'March 2024 - Aug 2024',
        image: 'pikart.webp',
        logos: ['svelte.png', 'tailwind.png', 'vercel.svg', 'openAI.png']
    },
	{
		title: 'WakeMate',
		description:
			'My first attempt at a startup. A subscription to call you each morning to wake you up',
		link: 'https://wakemate.joemmalatesta.com',
		dateRange: 'Apr 2023 - Jun 2023',
		image: '/wakeMate.webp',
		logos: ['svelte.png', 'mongo.png', 'twilio.svg', 'stripe.png']
	},
	{
		title: 'Discord "Yvy" Bot',
		description: 'Discord bot for retrieving osu! player info. My first full project',
		link: 'https://github.com/joemmalatesta/yvy-discord-bot',
		dateRange: 'May 2022 - June 2022',
		image: 'yvy-bot.webp',
		logos: ['python.png', 'pi.png', 'mongo.png', 'osu.png']
	},
];
