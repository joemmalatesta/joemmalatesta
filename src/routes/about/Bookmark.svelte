<script lang="ts">
	import type { Bookmark } from '$lib/bookmarks';

	export let bookmark: Bookmark;
</script>

<a
	href={bookmark.link}
	target="_blank"
	class="opacity-90 hover:opacity-100 hover:bg-light/5 sm:px-3 py-2 rounded-lg items-center duration-300 flex justify-between"
>
	<div class="w-2/3 flex gap-1 items-center text-base sm:text-lg">
		<img
			src="/bookmarks/{bookmark.image}"
			alt={bookmark.title}
			class="w-5 h-5 sm:w-6 sm:h-6 inline rounded-full"
		/>
		{bookmark.title}
	</div>
	<div class="w-1/3 opacity-50 text-sm flex justify-end">
		<div class="truncate">
			{bookmark.link?.replace(/^https?:\/\//, '')}
			<img src="icons/outlink.svg" alt="outlink" class="w-4 h-4 inline" />
		</div>
	</div>
</a>
