import { filmImages, filmSourceId, type FilmImage } from '../film';

function tokenize(...parts: string[]): string[] {
	const tags = new Set<string>();
	for (const part of parts) {
		for (const token of part
			.toLowerCase()
			.split(/[^a-z0-9#+]+/)
			.filter((t) => t.length > 2 && t !== 'the' && t !== 'and')) {
			tags.add(token);
		}
	}
	return [...tags];
}

export function tagsForPhoto(image: FilmImage): string[] {
	const tags = tokenize(image.category, image.location, image.description, 'film', 'photo');
	if (/philippines/i.test(image.location)) tags.push('philippines', 'philipines');
	return [...new Set(tags)];
}

export function photoMetaRows() {
	return filmImages.map((image) => ({
		sourceId: filmSourceId(image),
		tags: tagsForPhoto(image)
	}));
}
