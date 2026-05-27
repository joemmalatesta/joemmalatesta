export type Book = {
	slug: string;
	title: string;
	author: string;
	/** ISO date string — when you read / wrote about it */
	dateRead: string;
	thoughts: string;
	quote: string;
	/** Primary cover color — borders, spine, and pages are derived from this */
	coverColor: string;
	/** Local webp in /static/books/ or any image URL */
	coverImage?: string;
	/** ISBN-13 for fetching covers from Open Library */
	isbn?: string;
};

/**
 * Cover images live in /static/books/*.webp
 *
 * To fetch a new cover:
 *   curl -sL "https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg" -o cover.jpg
 *   cwebp -q 82 cover.jpg -o static/books/slug.webp
 *
 * Open Library API (free, no key):
 *   https://covers.openlibrary.org/b/isbn/{ISBN}-{S|M|L}.jpg
 *   https://covers.openlibrary.org/b/title/{Title}-{S|M|L}.jpg
 *
 * Pick coverColor to match the cover edge so borders/spine feel cohesive.
 */
export const books: Book[] = [
	{
		slug: 'when-breath-becomes-air',
		title: 'When Breath Becomes Air',
		author: 'Paul Kalanithi',
		dateRead: '2024-11-12',
		isbn: '9780812988406',
		coverColor: '#c4a035',
		coverImage: '/books/when-breath-becomes-air.webp',
		quote: 'What makes life worth living in the face of death?',
		thoughts: `This book is the first to make me cry. It's the first time I've cried to something not directly happening to me, and the first time I cried in 3 years.

Books far more tragic (A Long Way Gone, A Thousand Splendid Suns) haven't had the same effect, I think, because this is the first in which I could actually imagine myself in the author's shoes.

This book raised a question for me. I always had the thought that "someone else always has it worse" and often read to exemplify and remind myself of this. Not to say a terminal cancer diagnosis is something to scoff at, but isn't watching your sister get raped or holding your father's body in your hands after a bomb a far worse thing? But suffering is not really an objective thing. Yes, watching terrorism burn your city to the ground sounds worse than a cancer diagnosis surrounded by your loved ones. When death is an expectation instead of an anomaly, does it make it easier to accept? Is it more unfair — is it worse — to be born into a place where your dreams are crushed out of the womb, or have your dreams crushed later down the line, when you've spent your whole life in a game of delayed gratification. The former forces you to live in the moment, the latter presses you to live only when you know you'll die.

Maybe morbid to make a sports analogy here, but as a fanbase is it worse to have a really shitty team that has no chance of winning, or a team that you had hopes for that comes crumbling when it hits the playoffs. If there was nothing to lose in the first place, how tragic is it really? When you're winning, the wins are meh and the losses are crushing. When you're losing, the losses are meh and the wins are joyful. Are the two situations comparable?

If you were given a cancer diagnosis today, what would you do differently? Do you need the reminder of death in order for you to live?`
	},
	{
		slug: 'a-thousand-splendid-suns',
		title: 'A Thousand Splendid Suns',
		author: 'Khaled Hosseini',
		dateRead: '2023-08-03',
		isbn: '9781594489501',
		coverColor: '#1e4a6e',
		coverImage: '/books/a-thousand-splendid-suns.webp',
		quote:
			'One could not count the moons that shimmer on her roofs, or the thousand splendid suns that hide behind her walls.',
		thoughts: `This book was pretty good. Teared up a little on Laila's epilogue.

Women are treated like shit in Afghanistan. Mariam being a martyr was awesome — glad she was able to do good in her death.

Maybe a horrible take (given I don't have the full picture) but when I read of suffering and strife, I often find that the United States is the one to bail out the citizens from their internal fighting. This is not to say the US didn't have something to do with the conflict starting in the first place, but I'm not convinced that the US' participation in other nations' wars is a fully bad thing, when you consider how the fighting impacts the everyday person caught in the crossfire.`
	},
	{
		slug: 'a-long-way-gone',
		title: 'A Long Way Gone',
		author: 'Ishmael Beah',
		dateRead: '2019-04-15',
		isbn: '9780374531263',
		coverColor: '#6b5038',
		coverImage: '/books/a-long-way-gone.webp',
		quote:
			'In the sky there are always answers and explanations for everything: every pain, every suffering, joy and confusion.',
		thoughts: `Read this in high school. The first book I remember actually enjoying. Also the most tragic book I've ever read.

I should re-read this for a refresher.`
	},
	{
		slug: 'atomic-habits',
		title: 'Atomic Habits',
		author: 'James Clear',
		dateRead: '2023-01-22',
		isbn: '9780735211292',
		coverColor: '#d4a017',
		coverImage: '/books/atomic-habits.webp',
		quote: 'Every action you take is a vote for the type of person you wish to become.',
		thoughts: `Need to re-read. Actually changed how I structure my life though.`
	},
	{
		slug: 'the-5-am-club',
		title: 'The 5 AM Club',
		author: 'Robin Sharma',
		dateRead: '2022-06-08',
		isbn: '9781443456623',
		coverColor: '#e85d2a',
		coverImage: '/books/the-5-am-club.webp',
		quote: 'Own your morning. Elevate your life.',
		thoughts: `Shitty ass book. I don't know why I'm so fond of it though. I took none of the advice in the book yet I found myself with a heightened sense of gratitude as I was reading it.`
	},
	{
		slug: 'the-girl-with-the-dragon-tattoo',
		title: 'The Girl with the Dragon Tattoo',
		author: 'Stieg Larsson',
		dateRead: '2024-02-19',
		isbn: '9781849160322',
		coverColor: '#1c1410',
		coverImage: '/books/the-girl-with-the-dragon-tattoo.webp',
		quote: "Everyone has secrets. It's just a matter of finding out what they are.",
		thoughts: `Only fiction book I've really liked. Had me sacrificing my sleep schedule to finish it (that's honestly not saying that much).`
	},
	{
		slug: 'ishmael',
		title: 'Ishmael',
		author: 'Daniel Quinn',
		dateRead: '2021-11-30',
		isbn: '9780553375404',
		coverColor: '#3a6b52',
		coverImage: '/books/ishmael.webp',
		quote:
			"You're captives of a civilizational system that more or less compels you to go on destroying the world in order to live.",
		thoughts: `A book my brother made me read. It has two main arcs. One where it compares our consumption of the earth's resources to jumping off a cliff with homemade wings, which I think is a completely false equivalence.

Second part was a bit about history, Adam and Eve and how the apple gave them the illusion that they were the ones to pass judgement on what is good and evil, and taking the power from the Gods. It also talked about how Cain and Abel represented "Takers" and "Leavers", which were defined during the agricultural revolution during the time of the Fertile Crescent. The Leavers are those who live in balance with the world around them — the Takers are the rest of us.`
	}
];

export function getBookBySlug(slug: string): Book | undefined {
	return books.find((book) => book.slug === slug);
}

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

export function deriveBookColors(coverColor: string) {
	const rgb = hexToRgb(coverColor);
	return {
		dark: rgbToHex(...mix(rgb, [0, 0, 0], 0.5)),
		subtle: rgbToHex(...mix(rgb, [128, 128, 128], 0.55)),
		main: rgbToHex(...mix(rgb, [249, 255, 255], 0.9))
	};
}

/** Format date for display — e.g. "Nov 12, 2024" */
export function formatBookDate(dateRead: string) {
	return new Date(dateRead).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

/** Open Library cover URL for a given ISBN (jpg, redirect-friendly) */
export function openLibraryCover(isbn: string, size: 'S' | 'M' | 'L' = 'L') {
	return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
}
