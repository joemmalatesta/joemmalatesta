<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import type { Question } from './types';

	const qnas: Question[] = [
		{
			question: 'What tech stack do you use most often?',
			answer: 'I primarily work with SvelteKit, Tailwind CSS, and Vercel for deployment. For backend needs, I often reach for Supabase or Firebase depending on the project requirements.',
			date: 'March 15, 2024'
		},
		{
			question: 'How did you get into web development?',
			answer: 'I started with basic HTML/CSS in high school, but really dove deep during college when I discovered modern frameworks and the joy of building interactive applications.',
			date: 'March 10, 2024'
		},
		{
			question: 'What\'s your favorite project you\'ve worked on?',
			answer: 'Probably Groople - it was my first project that gained real users and taught me a lot about building for an audience rather than just for myself.',
			date: 'March 5, 2024'
		}
	];
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
			{#each qnas as qna}
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
