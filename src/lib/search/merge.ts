import type { SearchHit } from './types';

export const kindLabel: Record<SearchHit['kind'], string> = {
	writing: 'Writing',
	project: 'Projects',
	bookmark: 'Bookmarks',
	photo: 'Photos',
	update: 'Updates',
	qa: 'Q&A',
	page: 'Pages'
};

export const kindOrder: SearchHit['kind'][] = [
	'photo',
	'writing',
	'project',
	'update',
	'bookmark',
	'qa',
	'page'
];

export type ResultSection = {
	label: string;
	items: SearchHit[];
};

/** One row per destination page. Writing chunks share /writing/slug with no hash. */
export function pageKey(hit: SearchHit): string {
	if (hit.kind === 'writing') {
		return hit.sourceId.split('#')[0] ?? hit.url;
	}
	return hit.sourceId;
}

export function pageTitle(hit: SearchHit): string {
	if (hit.kind === 'writing') {
		return hit.title.split(' — ')[0] ?? hit.title;
	}
	return hit.title;
}

export function collapsePageHits(hits: SearchHit[]): SearchHit[] {
	const seen = new Set<string>();
	const out: SearchHit[] = [];
	for (const hit of hits) {
		const key = pageKey(hit);
		if (seen.has(key)) continue;
		seen.add(key);
		out.push({
			...hit,
			sourceId: key,
			title: pageTitle(hit)
		});
	}
	return out;
}

/** Drop weak vector neighbors. Keyword hits have no score and always stay. */
export function closeSemanticHits(hits: SearchHit[]): SearchHit[] {
	const scored = hits.filter((hit) => typeof hit.score === 'number');
	if (!scored.length) return [];
	const top = Math.max(...scored.map((hit) => hit.score ?? 0));
	const floor = Math.max(0.32, top * 0.75);
	return scored.filter((hit) => (hit.score ?? 0) >= floor);
}

export function mergeHits(primary: SearchHit[], extra: SearchHit[]): SearchHit[] {
	return collapsePageHits([...primary, ...closeSemanticHits(extra)]);
}

export function arrangeHits(hits: SearchHit[]): { top: SearchHit[]; more: SearchHit[] } {
	const collapsed = collapsePageHits(hits);
	const top: SearchHit[] = [];
	const taken = new Set<string>();
	for (const kind of kindOrder) {
		const hit = collapsed.find((row) => row.kind === kind);
		if (!hit) continue;
		top.push(hit);
		taken.add(pageKey(hit));
	}
	return {
		top,
		more: collapsed.filter((hit) => !taken.has(pageKey(hit)))
	};
}

export function resultSections(hits: SearchHit[]): ResultSection[] {
	const { top, more } = arrangeHits(hits);
	const sections: ResultSection[] = [];
	if (top.length) sections.push({ label: 'Top', items: top });
	for (const kind of kindOrder) {
		const items = more.filter((hit) => hit.kind === kind);
		if (items.length) sections.push({ label: kindLabel[kind], items });
	}
	return sections;
}

export function flatResults(hits: SearchHit[]): SearchHit[] {
	return resultSections(hits).flatMap((section) => section.items);
}
