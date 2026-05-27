import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getBookBySlug } from '$lib/books';

export const load: PageLoad = ({ params }) => {
	const book = getBookBySlug(params.slug);

	if (!book) {
		error(404, 'Book not found');
	}

	return { book };
};
