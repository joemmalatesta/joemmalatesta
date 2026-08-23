export type ReadingKind = 'book' | 'essay';

export type ReadingItem = {
	title: string;
	/** Author for books, writer or publication for essays */
	byline: string;
	kind: ReadingKind;
	/** Amazon, publisher, or the essay URL */
	href: string;
	/** Optional line on the row — a takeaway or quote. Fine to leave empty. */
	note?: string;
	/** ISO date string */
	date?: string;
	/** Primary color — spine, paper edges, masthead */
	coverColor: string;
	/** Local webp in /static/books/ or any image URL */
	coverImage?: string;
	/** Shown inside the opening book, if present */
	quote?: string;
	isbn?: string;
};

/**
 * Cover images live in /static/books/*.webp
 *
 *   curl -sL "https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg" -o cover.jpg
 *   cwebp -q 82 cover.jpg -o static/books/slug.webp
 */
export const reading: ReadingItem[] = [
	{
		kind: 'book',
		title: 'When Breath Becomes Air',
		byline: 'Paul Kalanithi',
		date: '2024-11-12',
		isbn: '9780812988406',
		href: 'https://www.amazon.com/s?k=9780812988406',
		coverColor: '#c4a035',
		coverImage: '/books/when-breath-becomes-air.webp',
		quote: 'What makes life worth living in the face of death?',
		note: 'The first book to make me cry. Suffering is not an objective thing.'
	},
	{
		kind: 'book',
		title: 'A Thousand Splendid Suns',
		byline: 'Khaled Hosseini',
		date: '2023-08-03',
		isbn: '9781594489501',
		href: 'https://www.amazon.com/s?k=9781594489501',
		coverColor: '#1e4a6e',
		coverImage: '/books/a-thousand-splendid-suns.webp',
		quote:
			'One could not count the moons that shimmer on her roofs, or the thousand splendid suns that hide behind her walls.'
	},
	{
		kind: 'book',
		title: 'A Long Way Gone',
		byline: 'Ishmael Beah',
		date: '2019-04-15',
		isbn: '9780374531263',
		href: 'https://www.amazon.com/s?k=9780374531263',
		coverColor: '#6b5038',
		coverImage: '/books/a-long-way-gone.webp',
		quote:
			'In the sky there are always answers and explanations for everything: every pain, every suffering, joy and confusion.',
		note: 'The first book I remember actually enjoying. Also the most tragic.'
	},
	{
		kind: 'book',
		title: 'Atomic Habits',
		byline: 'James Clear',
		date: '2023-01-22',
		isbn: '9780735211292',
		href: 'https://www.amazon.com/s?k=9780735211292',
		coverColor: '#d4a017',
		coverImage: '/books/atomic-habits.webp',
		quote: 'Every action you take is a vote for the type of person you wish to become.',
		note: 'Every action is a vote for the person you wish to become.'
	},
	{
		kind: 'book',
		title: 'The 5 AM Club',
		byline: 'Robin Sharma',
		date: '2022-06-08',
		isbn: '9781443456623',
		href: 'https://www.amazon.com/s?k=9781443456623',
		coverColor: '#e85d2a',
		coverImage: '/books/the-5-am-club.webp',
		quote: 'Own your morning. Elevate your life.'
	},
	{
		kind: 'book',
		title: 'The Girl with the Dragon Tattoo',
		byline: 'Stieg Larsson',
		date: '2024-02-19',
		isbn: '9781849160322',
		href: 'https://www.amazon.com/s?k=9781849160322',
		coverColor: '#1c1410',
		coverImage: '/books/the-girl-with-the-dragon-tattoo.webp',
		quote: "Everyone has secrets. It's just a matter of finding out what they are."
	},
	{
		kind: 'book',
		title: 'Ishmael',
		byline: 'Daniel Quinn',
		date: '2021-11-30',
		isbn: '9780553375404',
		href: 'https://www.amazon.com/s?k=9780553375404',
		coverColor: '#3a6b52',
		coverImage: '/books/ishmael.webp',
		quote:
			"You're captives of a civilizational system that more or less compels you to go on destroying the world in order to live."
	},
	{
		kind: 'book',
		title: 'The Glass Castle',
		byline: 'Jeannette Walls',
		date: '2023-05-14',
		isbn: '9780743247542',
		href: 'https://www.amazon.com/s?k=9780743247542',
		coverColor: '#8b6914',
		coverImage: '/books/the-glass-castle.webp',
		quote: 'Things usually work out in the end.',
		note: 'The parents aren’t villains — just incapable of putting their kids first.'
	},
	{
		kind: 'essay',
		title: 'Reflecting',
		byline: 'Sahil Lavingia',
		date: '2019-07-23',
		href: 'https://sahillavingia.com/reflecting',
		coverColor: '#3d2b1f'
	}
];

function clamp(n: number) {
	return Math.max(0, Math.min(255, Math.round(n)));
}

function hexToRgb(hex: string): [number, number, number] {
	const h = hex.replace('#', '');
	return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
	return `#${[r, g, b].map((c) => clamp(c).toString(16).padStart(2, '0')).join('')}`;
}

function mix(
	a: [number, number, number],
	b: [number, number, number],
	t: number
): [number, number, number] {
	return [a[0] * (1 - t) + b[0] * t, a[1] * (1 - t) + b[1] * t, a[2] * (1 - t) + b[2] * t];
}

export function derivePaperColors(coverColor: string) {
	const rgb = hexToRgb(coverColor);
	return {
		dark: rgbToHex(...mix(rgb, [0, 0, 0], 0.5)),
		subtle: rgbToHex(...mix(rgb, [128, 128, 128], 0.55)),
		main: rgbToHex(...mix(rgb, [249, 255, 255], 0.9))
	};
}

export function formatReadingDate(date: string) {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short'
	});
}
