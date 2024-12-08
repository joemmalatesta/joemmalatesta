<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import type { Question } from './types';
	import { enhance } from '$app/forms';
	import Header from '../../components/Heading.svelte';
	import Check from 'phosphor-svelte/lib/Check';
	import X from 'phosphor-svelte/lib/X';
	import { onMount } from 'svelte';
	import Likes from './Likes.svelte';

	let ready = false;
	let likedQuestions: string[] = [];
	onMount(() => {
		ready = true;
		// Load liked questions from localStorage on mount
		likedQuestions = JSON.parse(localStorage.getItem('likedQuestions') || '[]');
	});

	export let data;
	$: questions = data.questions as Question[];
	export let form;
</script>

<svelte:head>
	<title>Q&A - JMM</title>
	<meta name="description" content="Seek what your heart desires" />
</svelte:head>

<main class="max-w-3xl mx-auto min-h-[calc(100vh-9rem)]">
	{#if ready}
		<div class="flex flex-col gap-2 mb-5" in:fly={{ y: 50, duration: 600, delay: 0 }}>
			<Header title="Q&A" description="Seek what your heart desires" />
		</div>
		<section in:fly={{ y: 50, duration: 400, delay: 200 }}>
			<form action="?/askQuestion" method="POST" class="flex flex-col mb-2" use:enhance>
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
			<div
				class="w-full h-[3px] bg-gradient-to-r from-transparent via-light/20 to-transparent my-5"
			/>
			<div class="flex flex-col gap-8 py-5">
				{#each questions as qna}
					<div transition:fade>
						<span class="text-sm opacity-60 block mb-2">{qna.dateAnswered} </span>
						<h3 class="text-xl mb-1">{qna.question}</h3>
						<p class="opacity-70">{qna.answer}</p>
						<div class="flex items-center gap-1">
							<Likes question={qna} />
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</main>
