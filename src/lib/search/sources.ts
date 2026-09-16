import fs from 'node:fs';
import path from 'node:path';
import { bookmarks } from '../bookmarks';
import { filmImages, filmSourceId, filmThumbnailUrl, filmUrl, type FilmImage } from '../film';
import { projects } from '../projects';
import { updates } from '../timeline';
import { tagsForPhoto } from './photo-tags';
import type { SourceItem } from './types';

function parseDate(value: string): number | undefined {
	const ms = Date.parse(value);
	return Number.isNaN(ms) ? undefined : ms;
}

function chunkMarkdown(body: string, title: string): { heading: string; text: string }[] {
	const sections = body.split(/\n(?=##\s)/);
	const chunks: { heading: string; text: string }[] = [];
	for (const section of sections) {
		const lines = section.trim();
		if (!lines) continue;
		const headingMatch = lines.match(/^##\s+(.+)/);
		const heading = headingMatch?.[1]?.trim() ?? title;
		const text = lines.replace(/^##\s+.+/, '').trim();
		if (text.length < 40 && chunks.length) {
			chunks[chunks.length - 1].text += `\n\n${text}`;
			continue;
		}
		const parts = text.match(/[\s\S]{1,1600}/g) ?? [text];
		parts.forEach((part, i) => {
			chunks.push({ heading: i === 0 ? heading : `${heading} (${i + 1})`, text: part.trim() });
		});
	}
	return chunks.length ? chunks : [{ heading: title, text: body.slice(0, 1600) }];
}

function collectWriting(root: string): SourceItem[] {
	const dir = path.join(root, 'src/lib/posts');
	if (!fs.existsSync(dir)) return [];
	const items: SourceItem[] = [];
	for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
		const raw = fs.readFileSync(path.join(dir, file), 'utf8');
		const fm = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
		if (!fm) continue;
		const meta: Record<string, string> = {};
		for (const line of fm[1].split('\n')) {
			const idx = line.indexOf(':');
			if (idx === -1) continue;
			meta[line.slice(0, idx).trim()] = line
				.slice(idx + 1)
				.trim()
				.replace(/^"|"$/g, '');
		}
		const slug = file.replace(/\.md$/, '');
		const title = meta.title ?? slug;
		const description = meta.description ?? '';
		const body = fm[2].trim();
		const publishedAt = parseDate(meta.pubDate);
		chunkMarkdown(body, title).forEach((chunk, i) => {
			items.push({
				sourceId: i === 0 ? `writing:${slug}` : `writing:${slug}#${i}`,
				kind: 'writing',
				title: i === 0 ? title : `${title} — ${chunk.heading}`,
				searchText: `${title} ${description} ${chunk.heading} ${chunk.text}`,
				body: chunk.text || description,
				url: `/writing/${slug}`,
				tags: ['writing', 'blog'],
				publishedAt
			});
		});
	}
	items.push(
		{
			sourceId: 'writing:everyone-needs-to-know-how-to-trace',
			kind: 'writing',
			title: 'Everyone Needs to Know How to Trace',
			searchText: 'Everyone Needs to Know How to Trace Sentry distributed tracing blog',
			body: 'External Sentry post on why everyone needs to know how to trace.',
			url: 'https://blog.sentry.io/everyone-needs-to-know-how-to-trace/',
			tags: ['writing', 'sentry', 'external'],
			publishedAt: parseDate('2024-08-27')
		},
		{
			sourceId: 'writing:debugging-slow-pages-caused-by-slow-backends',
			kind: 'writing',
			title: 'Debugging Slow Pages Caused by Slow Backends',
			searchText: 'Debugging Slow Pages Caused by Slow Backends Sentry performance blog',
			body: 'External Sentry post on debugging slow pages caused by slow backends.',
			url: 'https://blog.sentry.io/debugging-slow-pages-caused-by-slow-backends/',
			tags: ['writing', 'sentry', 'external'],
			publishedAt: parseDate('2024-07-17')
		}
	);
	return items;
}

function countryOf(location: string): string | undefined {
	const parts = location
		.split(',')
		.map((part) => part.trim())
		.filter(Boolean);
	return parts.length > 1 ? parts.at(-1) : undefined;
}

function rankedUnique(values: string[]): string[] {
	const counts = new Map<string, number>();
	for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
	return [...counts.entries()]
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
		.map(([value]) => value);
}

function displayPlace(name: string): string {
	if (name === 'Philippines') return 'the Philippines';
	return name;
}

function joinAnd(parts: string[]): string {
	const names = parts.map(displayPlace);
	if (names.length <= 1) return names[0] ?? '';
	if (names.length === 2) return `${names[0]} and ${names[1]}`;
	return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}

function filmRollSources(): SourceItem[] {
	const groups = new Map<string, FilmImage[]>();
	for (const image of filmImages) {
		const list = groups.get(image.category) ?? [];
		list.push(image);
		groups.set(image.category, list);
	}

	const items: SourceItem[] = [];
	for (const [category, images] of groups) {
		const lead = images[0];
		if (!lead) continue;
		const locations = rankedUnique(images.map((image) => image.location));
		const countries = rankedUnique(
			images
				.map((image) => countryOf(image.location))
				.filter((value): value is string => Boolean(value))
		);
		const where = countries.length ? countries : locations;
		items.push({
			sourceId: `film:roll:${category}`,
			kind: 'photo',
			title: `${category} film`,
			searchText: `${category} film roll trip photos travel ${where.join(' ')} ${locations.join(' ')} ${images.map((image) => image.description).join(' ')}`,
			body: `Film from ${joinAnd(where)}.`,
			url: `/film?roll=${encodeURIComponent(category)}`,
			imageUrl: lead.source,
			thumbnailUrl: filmThumbnailUrl(lead),
			tags: [
				'film',
				'photo',
				'roll',
				category.toLowerCase(),
				...where.map((part) => part.toLowerCase())
			],
			location: where.join(', '),
			category
		});
	}
	return items;
}

export function collectSources(root = process.cwd()): SourceItem[] {
	const items: SourceItem[] = [];

	items.push(...collectWriting(root));

	for (const project of projects) {
		const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
		const image = project.image.startsWith('/') ? project.image : `/projects/${project.image}`;
		items.push({
			sourceId: `project:${slug}`,
			kind: 'project',
			title: project.title,
			searchText: `${project.title} ${project.description} ${project.dateRange}`,
			body: project.description,
			url: project.link,
			imageUrl: image,
			thumbnailUrl: image,
			tags: ['project', ...(project.logos ?? [])],
			publishedAt: parseDate(project.dateRange)
		});
	}

	for (const bookmark of bookmarks) {
		const slug = bookmark.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
		items.push({
			sourceId: `bookmark:${slug}`,
			kind: 'bookmark',
			title: bookmark.title,
			searchText: `${bookmark.title} ${bookmark.type}`,
			body: `${bookmark.type} bookmark`,
			url: bookmark.link ?? '/about',
			imageUrl: `/bookmarks/${bookmark.image}`,
			thumbnailUrl: `/bookmarks/${bookmark.image}`,
			tags: ['bookmark', bookmark.type],
			category: bookmark.type
		});
	}

	for (const image of filmImages) {
		items.push({
			sourceId: filmSourceId(image),
			kind: 'photo',
			title: image.description,
			searchText: `${image.description} ${image.location} ${image.category} ${tagsForPhoto(image).join(' ')}`,
			body: `${image.description} — ${image.location}`,
			url: filmUrl(image),
			imageUrl: image.source,
			thumbnailUrl: filmThumbnailUrl(image),
			tags: tagsForPhoto(image),
			location: image.location,
			category: image.category
		});
	}

	items.push(...filmRollSources());

	updates.forEach((update, i) => {
		items.push({
			sourceId: `update:${i}-${update.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
			kind: 'update',
			title: update.title,
			searchText: `${update.title} ${update.date} ${update.content}`,
			body: update.content,
			url: '/updates',
			tags: ['update', 'timeline'],
			publishedAt: parseDate(update.date)
		});
	});

	return items;
}
