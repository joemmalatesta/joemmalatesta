<script lang="ts">
	import { browser } from '$app/environment';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import posthog from 'posthog-js';

  if (browser) {
    beforeNavigate(() => posthog.capture('$pageleave'));
    afterNavigate(() => posthog.capture('$pageview'));
  }

  import '../app.css';
	import Footer from '../components/Footer.svelte';
  import Navbar from '../components/Navbar.svelte';
</script>

<svelte:head>
	<title>Joe Malatesta</title>
	<meta name="description" content="Joe Malatesta's Portfolio" />
</svelte:head>

<Navbar />
<slot />
<Footer />