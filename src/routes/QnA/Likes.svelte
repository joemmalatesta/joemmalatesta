<script lang="ts">
	import type { Question } from './types';
	import { enhance } from '$app/forms';
	import Heart from 'phosphor-svelte/lib/Heart';
	import { invalidateAll } from '$app/navigation';

	export let question: Question;
	export let likedQuestions: string[];
</script>

{#if question && likedQuestions}
	{#if !likedQuestions.includes(question.id)}
		<!-- If not liked. -->
		<form
			class="flex items-center gap-1"
			action="?/likeQuestion"
			method="POST"
			use:enhance={() => {
				return async () => {
					if (!likedQuestions.includes(question.id)) {
						likedQuestions = [...likedQuestions, question.id];
						localStorage.setItem('likedQuestions', JSON.stringify(likedQuestions));
					}
					invalidateAll();
				};
			}}
		>
			<input hidden type="text" name="id" value={question.id} />
			<button type="submit" class="hover:text-[#ff3333]">
				<Heart size={18} />
			</button>
			<p class="text-sm opacity-60">{!question.likes || question.likes < 0 ? 0 : question.likes}</p>
		</form>
	{:else}
		<!-- If liked. -->
		<form
			class="flex items-center gap-1"
			action="?/unlikeQuestion"
			method="POST"
			use:enhance={() => {
				return async () => {
					// Get liked questions from localStorage or initialize empty array
					if (likedQuestions.includes(question.id)) {
						likedQuestions = likedQuestions.filter((id) => id !== question.id);
						localStorage.setItem('likedQuestions', JSON.stringify(likedQuestions));
					}
					invalidateAll();
				};
			}}
		>
			<input hidden type="text" name="id" value={question.id} />
			<button type="submit">
				<Heart weight={'fill'} size={18} color="#ff3333" />
			</button>
			<p class="text-sm opacity-60">{!question.likes || question.likes < 0 ? 0 : question.likes}</p>
		</form>
	{/if}
{/if}
