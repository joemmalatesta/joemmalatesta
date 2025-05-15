export type FilmImage = {
	source: string;
	category: string;
	description: string;
	location: string;
};

export const filmFolders = ['Asia', '2022', '2024'];

export const filmImages: FilmImage[] = [
	// TODO: add description and location.
	// Asia
	{ source: '/photography/Asia/bella-elephant.webp', category: 'Asia', description: 'Meeting Dumbo', location: 'Khao Sok, Thailand' },
	{ source: '/photography/Asia/bella-fancipan.webp', category: 'Asia', description: 'Above the clouds', location: 'Fansipan, Vietnam' },
	{ source: '/photography/Asia/joe-lila.webp', category: 'Asia', description: 'Dim Sum w/ Lila', location: 'Tokyo, Japan' },
	{ source: '/photography/Asia/philipines.webp', category: 'Asia', description: 'A light blue horizon', location: 'Puerto Princesa, Philippines' },
	{ source: '/photography/Asia/bella-fuji.webp', category: 'Asia', description: 'Fuji on a cloudless day', location: 'Lake Yamanaka, Japan' },
	{ source: '/photography/Asia/water-buffalo.webp', category: 'Asia', description: "Sleepy water buffalo", location: 'Sapa, Vietnam' },
	{ source: '/photography/Asia/bella-thailand.webp', category: 'Asia', description: 'First floor of Iconsiam', location: 'Bangkok, Thailand' },
	{ source: '/photography/Asia/joe-fuji.webp', category: 'Asia', description: 'Breakfast at The Park', location: 'Fuji, Japan' },
	{ source: '/photography/Asia/thailand-skyline.webp', category: 'Asia', description: 'Smoggy Skyline', location: 'Bangkok, Thailand' },
	{ source: '/photography/Asia/sapa-hike.webp', category: 'Asia', description: 'A story best told in a rice field', location: 'Sapa, Vietnam' },
	{ source: '/photography/Asia/shibuya-crossing.webp', category: 'Asia', description: 'Shibuya Crossing', location: 'Shibuya, Japan' },
	// { source: '/photography/Asia/lila.webp', category: 'Asia', description: 'Lila', location: 'Tokyo, Japan' },
	{ source: '/photography/Asia/ghibli-museum.webp', category: 'Asia', description: 'Reconnecting with an old neighbor', location: 'Mitaka, Japan' },
	// 2022
	{ source: '/photography/2022/reba-leslie.webp', category: '2022', description: 'Re & Reba', location: 'The Thompson\'s Backyard' },
	{ source: '/photography/2022/stepback-j.webp', category: '2022', description: 'Stepback J', location: 'Vlads' },
	{ source: '/photography/2022/camerastore.webp', category: '2022', description: 'The reason this page exists', location: 'Camera Exchange' },
	{ source: '/photography/2022/summercamp.webp', category: '2022', description: 'Sciency summer camp', location: 'Oakland University' },
	{ source: '/photography/2022/jea-dog.webp', category: '2022', description: 'Jea & Gabriela', location: 'Meadow Brook' },
	{ source: '/photography/2022/brown.webp', category: '2022', description: 'Chris Bosh', location: 'Rochester, MI' },
	{ source: '/photography/2022/houseboat.webp', category: '2022', description: 'Above average fish', location: 'Table Rock Lake' },
	{ source: '/photography/2022/vlad-party.webp', category: '2022', description: 'Getting sturdy', location: 'Maybe New York' },
	{ source: '/photography/2022/grossy.webp', category: '2022', description: 'Gross\' New Beamer', location: 'Rochester, MI' },
	{ source: '/photography/2022/birthday.webp', category: '2022', description: 'Starting my second decade', location: 'Antonio\'s Pizza' },
	{ source: '/photography/2022/concert.webp', category: '2022', description: 'Pluto Projector', location: 'Meadow Brook Theatre' },
	// 2024
	{ source: '/photography/2024/kbbq.webp', category: '2024', description: 'KBBQ from Home', location: 'Home' },
	{ source: '/photography/2024/whitelake.webp', category: '2024', description: "The Miles Pedigree", location: 'White Lake, MI' },
	{ source: '/photography/2024/griffin.webp', category: '2024', description: 'Griffin', location: 'White Lake, MI' },
	{ source: '/photography/2024/painted-ladies.webp', category: '2024', description: 'Painted Ladies', location: 'Alamo Square, SF' },
	{ source: '/photography/2024/hackathon-utd.webp', category: '2024', description: 'UTD Solo Hack', location: 'UT Dallas' },
	{ source: '/photography/2024/yates.webp', category: '2024', description: 'Walking the Paint Creek', location: 'Yates Cider Mill' },
	{ source: '/photography/2024/cherry-republic.webp', category: '2024', description: 'Cherry Republic', location: 'Traverse City, MI' },
	{ source: '/photography/2024/cheddarbox-utd.webp', category: '2024', description: 'Cheddarboxd Demo', location: 'UT Dallas' },
	{ source: '/photography/2024/cheers.webp', category: '2024', description: 'Cheers', location: 'Home' },
	{ source: '/photography/2024/mira-DIA.webp', category: '2024', description: 'Mira @ The DIA', location: 'Detroit Institute of Arts' },
];
