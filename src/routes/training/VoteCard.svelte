<script lang="ts">
	import type { trainingData } from '$lib/types';

	export let data: trainingData;
</script>

<section>
	<div class="flex flex-col relative w-40 h-48 group rounded-lg ring-2 ring-light/20">
		<img
			class="w-40 h-40 object-cover absolute inset-0 rounded-t-lg"
			src={data.url}
			alt={data.label}
		/>
		<form action="?/vote" method="post" class="flex justify-center h-8 absolute bottom-0 w-full bg-dark rounded-b-lg overflow-hidden items-center">
			<input type="hidden" name="id" value={data.id} />
			<button
				class="w-1/3 text-light p-1 rounded-bl-lg hover:bg-light/10"
				type="submit"
				name="vote"
                title="vote no"
				value="no">X</button
			>
			<p
				title="labeled {data.label}"
				class="text-light bg-dark/60 p-1 w-1/3  font-bold text-center"
			>
				{data.label}
			</p>
			<button
				class="w-1/3 text-light p-1 rounded-br-lg hover:bg-light/10"
				type="submit"
				name="vote"
                title="vote yes"
				value="yes">✓</button
			>
		</form>
	</div>
</section>
