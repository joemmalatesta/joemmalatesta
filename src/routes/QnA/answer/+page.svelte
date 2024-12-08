<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import type { Question } from '../types';
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import Trash from 'phosphor-svelte/lib/Trash';
	import Header from '../../../components/Heading.svelte';


	export let data;
	let authenticated: boolean = false;
	$: authenticated = data.authenticated;
	let wrongPassword: boolean = false;
	let unansweredQuestions: Question[] = [];
	$: unansweredQuestions = data.questions || [];
	

	async function login(event: any) {
		return async ({ result }: { result: any }) => {
			authenticated = result.data.authenticated;
			wrongPassword = result.data.incorrect || result.data.missing;
		};
	}
</script>

<svelte:head>
	<title>Admin - JMM</title>
	<meta name="description" content="Admin access only" />
</svelte:head>

{#if !authenticated}
	<main
		class="max-w-3xl mx-auto px-6 py-8 min-h-[calc(100vh-9rem)] flex items-center justify-center"
	>
		<section class="w-full max-w-md" transition:fly={{ y: 50, duration: 400 }}>
			<div class="flex gap-1 items-center mb-2">
				<a href="/QnA" class="items-center flex">
					<ArrowLeft weight="bold" size={24} />
				</a>
				<h1 class="text-4xl font-semibold">Are you me?</h1>
			</div>
			<form action="?/login" method="POST" class="flex flex-col gap-1" use:enhance={login}>
				<input
					type="password"
					name="password"
					placeholder="Password"
					class="bg-light/5 rounded-lg p-3 w-full"
				/>
				<button
					type="submit"
					class="bg-light/5 hover:bg-light/10 rounded-lg p-3 w-full transition-colors"
				>
					Login
				</button>
			</form>
			{#if wrongPassword}
				<p class="text-red-500">No. You're not.</p>
			{/if}
		</section>
	</main>
{/if}
{#if authenticated}
	<main class="max-w-3xl w-full min-h-[calc(100vh-9rem)]" transition:fly={{ y: 50, duration: 400, delay: 500 }}>
		<Header title="Answer" description="There is not reason for me to style this"/>
			<div class="flex flex-col gap-5 w-full mt-10">
				{#each unansweredQuestions as question}
				<form action="?/answer" use:enhance method="POST" class="flex flex-col gap-1 w-full">
					<div class="flex flex-col gap-1">
						<span class="text-sm opacity-60">{question.dateAsked}</span>
						<p>{question.question}</p>
					</div>
						<input hidden type="text" name="id" value={question.id} />
						<textarea
							name="answer"
							class="bg-light/5 rounded-lg p-3 w-full h-20"
							placeholder="Answer"
						/>
						<div class="flex gap-1">
							<button
								type="submit"
								class="w-4/5 bg-light/5 hover:bg-light/10 rounded-lg p-2 transition-colors"
								>Answer</button
							>
							<button
								type="submit"
								formaction="?/delete"
								name="id"
								value={question.id}
								class="w-1/5 bg-red-500/10 hover:bg-red-500/20 p-2 rounded-lg h-[48px] flex items-center justify-center"
							>
								<Trash weight="bold" size={18} />
							</button>
						</div>
					</form>
				{:else}
					<p class="text-light/40">Good job Joe, you're up to date. <a class="underline" href="/QnA">Go back to questions</a></p>
				{/each}

			</div>
	</main>
{/if}
