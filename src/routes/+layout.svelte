<script lang="ts">
  import '../app.css';
	import Footer from '../components/Footer.svelte';
  import Navbar from '../components/Navbar.svelte';
</script>

<svelte:head>
  <title>Joe Malatesta</title>
  <meta name="description" content="Arjun's Portfolio" />
</svelte:head>

<Navbar />
<slot />
<Footer />