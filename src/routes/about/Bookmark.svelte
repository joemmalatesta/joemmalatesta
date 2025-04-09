<script lang="ts">
	import type { Bookmark } from '$lib/bookmarks';

	export let bookmark: Bookmark;
</script>

<a
	href={bookmark.link}
	target="_blank"
	class="opacity-90 hover:opacity-100 hover:bg-light/10 bg-light/5 px-3 py-2 rounded-full items-center duration-300 inline-flex gap-3 text-base"
>
	<div class="flex gap-2 items-center">
		<img
			src="/bookmarks/{bookmark.image}"
			alt={bookmark.title} 
			class="w-6 h-6 rounded-full"
		/>
		{bookmark.title}
	</div>
	<!-- <div class="opacity-50 text-sm flex items-center gap-1">
		{bookmark.link?.replace(/^https?:\/\//, '').split('/')[0]}
		<img src="icons/outlink.svg" alt="outlink" class="w-3.5 h-3.5" />
	</div> -->
</a>
