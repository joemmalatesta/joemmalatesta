<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import type { Question } from '../types';
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import ArrowClockwise from 'phosphor-svelte/lib/ArrowClockwise';
	import ArrowsClockwise from 'phosphor-svelte/lib/ArrowsClockwise';
	import Trash from 'phosphor-svelte/lib/Trash';
	import Header from '../../../components/Heading.svelte';
	import { invalidateAll } from '$app/navigation';

	let unansweredQuestions: Question[] = [];
	let deletedQuestions: Question[] = [];
	let answeredQuestions: Question[] = [];
	let authenticated: boolean = false;
	let wrongPassword: boolean = false;
	let activeTab: string = 'unanswered';

	async function login(event: any) {
		return async ({ result }: { result: any }) => {
			authenticated = result.data.authenticated;
			wrongPassword = result.data.incorrect || result.data.missing;
			unansweredQuestions = result.data.unansweredQuestions || [];
			deletedQuestions = result.data.deletedQuestions || [];
			answeredQuestions = result.data.answeredQuestions || [];
			invalidateAll();
		};
	}

	let failedId: string = '';

	async function updateQuestions() {
		return async ({ result }: { result: any }) => {
			if (result.data.failedId) {
				failedId = result.data.failedId;
				return;
			}
			unansweredQuestions = result.data.unansweredQuestions || [];
			deletedQuestions = result.data.deletedQuestions || [];
			answeredQuestions = result.data.answeredQuestions || [];
			invalidateAll();
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
					name="qnaPassword"
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
	<main
		class="max-w-3xl w-full min-h-[calc(100vh-9rem)]"
		transition:fly={{ y: 50, duration: 400, delay: 500 }}
	>
		<Header title="Answer" description="There is not reason for me to style this" />

		<div class="flex gap-2 mt-6 mb-4 border-b border-light/10">
			{#each ['unanswered', 'answered', 'deleted'] as tab}
				<button
					class="px-4 py-2 {activeTab === tab
						? 'border-b-2 border-light/80 font-medium'
						: 'text-light/60 hover:text-light/80'}"
					on:click={() => (activeTab = tab)}
				>
					{tab} ({tab === 'unanswered'
						? unansweredQuestions.length
						: tab === 'answered'
							? answeredQuestions.length
							: deletedQuestions.length})
				</button>
			{/each}
		</div>

		<div class="flex flex-col gap-5 w-full mt-4">
			{#if activeTab === 'unanswered'}
				{#each unansweredQuestions as question}
					<form
						action="?/answer"
						method="POST"
						use:enhance={updateQuestions}
						class="flex flex-col gap-1 w-full"
					>
						<div class="flex flex-col gap-1">
							<span class="text-sm opacity-60"
								>{new Date(question.dateAsked).toLocaleDateString('en-US')} at {new Date(
									question.dateAsked
								).toLocaleTimeString('en-US')}</span
							>
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
								class="w-1/5 bg-red-500/30 hover:bg-red-500/40 p-2 rounded-lg h-[48px] flex items-center justify-center"
							>
								<input hidden type="text" name="confirmation" value="delete" />
								<Trash weight="bold" size={18} />
							</button>
						</div>
						{#if failedId === question.id}
							<p class="text-red-500">Couldn't answer question</p>
						{/if}
					</form>
				{:else}
					<p class="text-light/40">
						Good job Joe, you're up to date! <a class="underline" href="/QnA"
							>Go back to questions</a
						>
					</p>
				{/each}
			{/if}

			{#if activeTab === 'answered'}
				{#each answeredQuestions as question}
					<div class="flex flex-col gap-1">
						<span class="text-sm opacity-60"
							>{new Date(question.dateAsked).toLocaleDateString('en-US')} at {new Date(
								question.dateAsked
							).toLocaleTimeString('en-US')}</span
						>
						<p class="font-medium">{question.question}</p>
						<p class=" text-light/80">{question.answer}</p>
						<form
							action="?/delete"
							method="POST"
							use:enhance={updateQuestions}
							class="w-full flex gap-1"
						>
							<input hidden type="text" name="id" value={question.id} />
							<input
								class="w-3/5 bg-light/5 rounded-lg p-2"
								type="text"
								name="confirmation"
								placeholder="Type 'delete' to confirm"
							/>
							<button
								type="submit"
								class="w-2/5 bg-red-500/20 hover:bg-red-500/40 p-2 rounded-lg flex items-center justify-center gap-2"
							>
								<Trash weight="bold" size={18} />
								<span>Delete</span>
							</button>
						</form>
						{#if failedId === question.id}
							<p class="text-red-500">Couldn't delete question</p>
						{/if}
					</div>
				{:else}
					<p class="text-light/40">No answered questions yet.</p>
				{/each}
			{/if}

			{#if activeTab === 'deleted'}
				{#each deletedQuestions as question}
					<div class="flex flex-col gap-1">
						<span class="text-sm opacity-60"
							>{new Date(question.dateAsked).toLocaleDateString('en-US')} at {new Date(
								question.dateAsked
							).toLocaleTimeString('en-US')}</span
						>
						<p class="font-medium">{question.question}</p>
						<p class="text-light/80 text-sm">{question.answer ?? 'Unanswered'}</p>
						<div class="flex gap-2">
							<form action="?/restore" method="POST" use:enhance={updateQuestions} class="w-1/2">
								<input hidden type="text" name="id" value={question.id} />
								<button
									type="submit"
									class="w-full flex gap-1 items-center justify-center bg-light/5 hover:bg-light/10 rounded-lg p-2 transition-colors"
								>
									Restore
									<ArrowClockwise weight="bold" size={18} />
								</button>
							</form>
							{#if question.answer}
							<form
								action="?/clearAnswer"
								method="POST"
								use:enhance={updateQuestions}
								class="w-1/2"
							>
								<input hidden type="text" name="id" value={question.id} />
								<button
									type="submit"
									class="w-full bg-blue-500/20 hover:bg-blue-500/40 p-2 rounded-lg flex items-center justify-center gap-2"
								>
									Clear Answer
									<ArrowsClockwise weight="bold" size={18} />
								</button>
							</form>
							{/if}
							<form
								action="?/deleteForGood"
								method="POST"
								use:enhance={updateQuestions}
								class="w-1/2"
							>
								<input hidden type="text" name="id" value={question.id} />
								<button
									type="submit"
									class="w-full bg-red-500/20 hover:bg-red-500/40 p-2 rounded-lg flex items-center justify-center gap-2"
								>
									Delete For Good
									<Trash weight="bold" size={18} />
								</button>
							</form>
						</div>
					</div>
				{:else}
					<p class="text-light/40">No deleted questions.</p>
				{/each}
			{/if}
		</div>
	</main>
{/if}
