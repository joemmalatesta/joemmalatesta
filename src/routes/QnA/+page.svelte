<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import type { Question } from './types';
	import { enhance } from '$app/forms';
	import Header from '../../components/Heading.svelte';
	import Check from 'phosphor-svelte/lib/Check';
	import X from 'phosphor-svelte/lib/X';

	export let data;
	$: questions = data.questions as Question[];
	export let form;
</script>

<svelte:head>
	<title>Q&A - JMM</title>
	<meta name="description" content="Seek what your heart desires" />
</svelte:head>

<main class="max-w-3xl mx-auto">
	<div class="flex flex-col gap-2 mb-5" in:fly={{ y: 50, duration: 600, delay: 0 }}>
		<Header title="Q&A" description="Seek what your heart desires" />
	</div>
	<section in:fly={{ y: 50, duration: 400, delay: 200 }}>
		<form action="" method="POST" class="flex flex-col mb-2" use:enhance>
			<label for="question" class="ml-1 text-light/40 text-sm">Ask a question</label>
			<div class="flex w-full sm:flex-row flex-col">
				<input
					class="w-full p-2 sm:p-3 rounded-lg sm:rounded-r-none bg-light/5 focus:ring-1 focus:ring-light/20 focus:outline-none"
					type="text"
					name="question"
					placeholder="Question"
				/>
				<button
					class="w-full mt-2 sm:mt-0 sm:w-3/12 p-2 text-center rounded-lg sm:rounded-l-none bg-light/10 hover:bg-light/20 focus:ring-1 focus:ring-light/20 focus:outline-none"
					type="submit">Send Question</button
				>
			</div>
		</form>
		{#if form?.message && form?.success}
			<p class="text-sm opacity-70 flex items-center gap-1">
				<Check weight="bold" size={24} />
				{form.message}
			</p>
		{/if}
		{#if form?.message && !form?.success}
			<p class="text-sm opacity-70 flex items-center gap-1">
				<X weight="bold" size={24} />
				{form.message}
			</p>
		{/if}
		<div class="w-full h-[3px] bg-gradient-to-r from-transparent via-light/20 to-transparent my-5" />
		<div class="flex flex-col gap-8 py-5">
			{#each questions as qna}
				<div class="p-6 rounded-lg bg-light/5" transition:fade>
					<div class="flex items-start justify-between mb-4">
						<h3 class="text-xl font-medium">{qna.question}</h3>
						<span class="text-sm opacity-60">{qna.date}</span>
					</div>
					<p class="leading-relaxed opacity-90">{qna.answer}</p>
				</div>
			{/each}
		</div>
	</section>
</main>
