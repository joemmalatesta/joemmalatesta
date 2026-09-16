export type SearchKind = 'writing' | 'project' | 'bookmark' | 'photo' | 'update' | 'qa' | 'page';

export type SearchHit = {
	id: string;
	sourceId: string;
	kind: SearchKind;
	title: string;
	body: string;
	url: string;
	imageUrl?: string;
	thumbnailUrl?: string;
	tags: string[];
	location?: string;
	category?: string;
	score?: number;
};

export type SourceItem = {
	sourceId: string;
	kind: SearchKind;
	title: string;
	searchText: string;
	body: string;
	url: string;
	imageUrl?: string;
	thumbnailUrl?: string;
	tags: string[];
	location?: string;
	category?: string;
	publishedAt?: number;
};
