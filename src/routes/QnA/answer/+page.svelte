<script lang="ts">
	import { fly } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import type { Question } from '../types';
    
    let authenticated: boolean = false;
    let wrongPassword: boolean = false;
    let questions: Question[] = [];

	async function login(event: any) {
		return async ({ result }: { result: any }) => {
            console.log(result);
			authenticated = result.data.success;
            wrongPassword = result.data.incorrect || result.data.missing;
		};
	}
</script>

<svelte:head>
	<title>Admin - JMM</title>
	<meta name="description" content="Admin access only" />
</svelte:head>

{#if !authenticated}
<main class="max-w-3xl mx-auto px-6 py-8 min-h-[calc(100vh-9rem)] flex items-center justify-center">
	<section class="w-full max-w-md" transition:fly={{ y: 50, duration: 400 }}>
		<h1 class="text-4xl font-semibold mb-2">Are you me?</h1>
		<form action="?/login" method="POST" class="flex flex-col gap-4" use:enhance={login}>
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
    <main>
        <h1>Dashboard</h1>
    </main>
{/if}
