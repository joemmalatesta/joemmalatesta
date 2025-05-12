export type FilmImage = {
	source: string;
	category: string;
	description?: string;
	location?: string;
};

export const filmImages: FilmImage[] = [
	// TODO: add description and location.
	// Asia
	{ source: '/photography/Asia/bella-elephant.webp', category: 'Asia', description: 'Meeting Dumbo', location: 'Khao Sok, Thailand' },
	{ source: '/photography/Asia/bella-fancipan.webp', category: 'Asia', description: 'Above the clouds', location: 'Fansipan, Vietnam' },
	{ source: '/photography/Asia/joe-lila.webp', category: 'Asia', description: 'Dim Sum with Lila', location: 'Tokyo, Japan' },
	{ source: '/photography/Asia/philipines.webp', category: 'Asia', description: 'A light blue horizon', location: 'Puerto Princesa, Philippines' },
	{ source: '/photography/Asia/japan-food.webp', category: 'Asia', description: 'Breakfast at The Park', location: 'Fuji, Japan' },
	{ source: '/photography/Asia/bella-fuji.webp', category: 'Asia', description: 'Fuji on a cloudless day', location: 'Lake Yamanaka, Japan' },
	{ source: '/photography/Asia/water-buffalo.webp', category: 'Asia', description: "Apparently they're water buffalo", location: 'Sapa, Vietnam' },
	{ source: '/photography/Asia/bella-thailand.webp', category: 'Asia', description: 'First floor of Iconsiam', location: 'Bangkok, Thailand' },
	{ source: '/photography/Asia/joe-fuji.webp', category: 'Asia', description: 'A beautiful day in Japan', location: 'Fuji, Japan' },
	{ source: '/photography/Asia/thailand-skyline.webp', category: 'Asia', description: 'Skyline of Bangkok', location: 'Bangkok, Thailand' },
	{ source: '/photography/Asia/sapa-hike.webp', category: 'Asia', description: 'Hiking in Sapa', location: 'Sapa, Vietnam' },
	{ source: '/photography/Asia/shibuya-crossing.webp', category: 'Asia', description: 'Shibuya Crossing', location: 'Shibuya, Japan' },
	{ source: '/photography/Asia/lila.webp', category: 'Asia', description: 'Lila in the snow', location: 'Fuji, Japan' },
	{ source: '/photography/Asia/bella-ghibli.webp', category: 'Asia', description: 'Reconnecting with an old neighbor', location: 'Tokyo, Japan' },
	{ source: '/photography/Asia/ghibli-museum.webp', category: 'Asia', description: 'Ghibli Museum', location: 'Mitaka, Japan' },
	// 2022
	{ source: '/photography/2022/joes-tuff.webp', category: '2022' },
	{ source: '/photography/2022/stepback-j.webp', category: '2022' },
	{ source: '/photography/2022/joe-candid.webp', category: '2022' },
	{ source: '/photography/2022/reba-leslie.webp', category: '2022' },
	{ source: '/photography/2022/jea-dog.webp', category: '2022' },
	{ source: '/photography/2022/reba.webp', category: '2022' },
	{ source: '/photography/2022/camerastore.webp', category: '2022' },
	{ source: '/photography/2022/summercamp.webp', category: '2022' },
	{ source: '/photography/2022/houseboat.webp', category: '2022' },
	{ source: '/photography/2022/vlad-party.webp', category: '2022' },
	{ source: '/photography/2022/brown.webp', category: '2022' },
	{ source: '/photography/2022/grossy.webp', category: '2022' },
	{ source: '/photography/2022/birthday.webp', category: '2022' },
	{ source: '/photography/2022/mother.webp', category: '2022' },
	{ source: '/photography/2022/concert.webp', category: '2022' },
	// 2024
	{ source: '/photography/2024/kbbq.webp', category: '2024' },
	{ source: '/photography/2024/whitelake.webp', category: '2024' },
	{ source: '/photography/2024/griffin.webp', category: '2024' },
	{ source: '/photography/2024/painted-ladies.webp', category: '2024' },
	{ source: '/photography/2024/hackathon-utd.webp', category: '2024' },
	{ source: '/photography/2024/yates.webp', category: '2024' },
	{ source: '/photography/2024/cherry-republic.webp', category: '2024' },
	{ source: '/photography/2024/cheddarbox-utd.webp', category: '2024' },
	{ source: '/photography/2024/cheers.webp', category: '2024' },
	{ source: '/photography/2024/mira-DIA.webp', category: '2024' },
	{ source: '/photography/2024/mira.webp', category: '2024' }
];
