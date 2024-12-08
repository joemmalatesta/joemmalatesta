<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import type { Question } from './types';
	export let data;
	$: questions = data.questions;
</script>

<svelte:head>
	<title>Q&A - JMM</title>
	<meta name="description" content="Seek what your heart desires" />
</svelte:head>

<main class="max-w-3xl mx-auto px-6 py-8">
	<section transition:fly={{ y: 50, duration: 400 }}>
		<h1 class="text-4xl font-semibold mb-2">Q&A</h1>
		<p class="opacity-70">Seek what your heart desires</p>
        <form action="" method="POST" class="flex mb-2">
            <input class="bg-light/5 rounded-l-lg p-2 w-5/6" type="text" name="question" placeholder="Question" />
            <button class="bg-light/5 rounded-r-lg hover:bg-light/10 p-2 w-1/6" type="submit">Ask me</button>
        </form>
		<div class="flex flex-col gap-8">
			{#each questions as qna}
				<div class="bg-light/5 rounded-lg p-6" transition:fade>
					<div class="flex justify-between items-start mb-4">
						<h3 class="text-xl font-medium">{qna.question}</h3>
						<span class="text-sm opacity-60">{qna.date}</span>
					</div>
					<p class="opacity-90 leading-relaxed">{qna.answer}</p>
				</div>
			{/each}
		</div>
	</section>
</main>
