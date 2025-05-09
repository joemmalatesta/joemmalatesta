<script lang="ts">
	export let type: 'gold' | 'fuji' = 'gold';
</script>

<!-- Gold Film Canister -->
<div id="can" class={type === 'gold' ? 'visible' : 'hidden'}>
	<div id="plastic-top"></div>
	<div id="topcap"></div>
	<div id="text">
		<p class="kodak">Kodak</p>
		<p class="gold">GOLD</p>
		<p class="num">400</p>
		<p class="mm">35mm color print film</p>
		<p class="exp">36 exp.</p>
		<p class="process">PROCESS C-41</p>
	</div>
	<div id="bottomcap"></div>
</div>

<!-- Fujifilm Canister -->
<div id="fuji-can" class={type === 'fuji' ? 'visible' : 'hidden'}>
	<div id="fuji-topcap"></div>
	<div id="fuji-text">
		<p class="fuji-brand">FUJIFILM</p>
		<p class="fuji-num">400</p>
		<p class="fuji-desc">FILM FOR COLOR PRINTS</p>
	</div>
	<div id="fuji-bottomcap"></div>
</div>

<style>
	/* Gold Canister Styles */
	#plastic-top {
		position: absolute;
		top: -15px;
		left: 0;
		width: 120px;
		height: 15px;
		background: #000;
		border-radius: 6px 6px 0 0;
		z-index: 41;
	}

	#topcap,
	#bottomcap {
		position: absolute;
		left: -5px;
		width: 130px;
		height: 10px;
		background: linear-gradient(
			to right,
			rgba(63, 63, 63, 1) 0%,
			rgba(0, 0, 0, 1) 17%,
			rgba(86, 86, 86, 1) 39%,
			rgba(14, 14, 14, 1) 89%,
			rgba(71, 71, 71, 1) 100%
		);
	}

	#bottomcap {
		bottom: 0;
	}

	#can {
		box-shadow: 8px 0px 10px rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 20px;
		left: 50px;
		width: 120px;
		height: 230px;
		background: linear-gradient(
			to right,
			rgba(164, 97, 8, 1) 0%,
			rgba(242, 216, 67, 1) 38%,
			rgba(223, 150, 35, 1) 80%,
			rgba(164, 97, 8, 1) 100%
		);
		z-index: 40;
		transition: opacity 0.3s ease;
	}

	#can #text {
		transform: rotate(90deg) translate(60px, 40px);
		display: block;
		color: #000;
		font-family: helvetica;
		font-weight: bold;
		text-align: center;
		width: 200px;
	}

	#can p {
		margin: 0;
	}

	#can p.kodak {
		font-size: 1.5em;
		line-height: 0.9em;
		font-style: italic;
	}

	#can p.gold {
		font-size: 3em;
		line-height: 0.9em;
	}

	#can p.num {
		font-size: 2em;
		font-weight: 800;
		line-height: 0.9em;
	}

	#can p.mm {
		font-size: 0.8em;
		font-family: sans-serif;
		margin-bottom: 5px;
	}

	#can p.exp {
		font-size: 0.9em;
		font-weight: bold;
	}

	#can p.process {
		font-size: 0.75em;
		margin-top: 5px;
		letter-spacing: 0.05em;
	}

	/* Fujifilm Canister Styles */
	#fuji-topcap,
	#fuji-bottomcap {
		position: absolute;
		left: -5px;
		width: 130px;
		height: 10px;
		background: linear-gradient(
			to right,
			rgba(63, 63, 63, 1) 0%,
			rgba(0, 0, 0, 1) 17%,
			rgba(86, 86, 86, 1) 39%,
			rgba(14, 14, 14, 1) 89%,
			rgba(71, 71, 71, 1) 100%
		);
	}

	#fuji-bottomcap {
		bottom: 0;
	}

	#fuji-can {
		box-shadow: 8px 0px 10px rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 20px;
		left: 50px;
		width: 120px;
		height: 230px;
		background: linear-gradient(
			to right,
			rgba(125, 125, 125, 1) 0%,
			rgba(200, 200, 200, 1) 40%,
			rgba(255, 255, 255, 1) 50%,
			rgba(200, 200, 200, 1) 60%,
			rgba(125, 125, 125, 1) 100%
		);
		z-index: 40;
		transition: opacity 0.3s ease;
	}

	#fuji-can::before {
		content: '';
		position: absolute;
		top: 30px;
		left: 0;
		width: 120px;
		height: 110px;
		background: #43a047;
		z-index: -1;
	}

	#fuji-can #fuji-text {
		transform: rotate(90deg) translate(60px, 40px);
		display: block;
		color: #fff;
		font-family: helvetica;
		font-weight: bold;
		text-align: center;
		width: 200px;
	}

	#fuji-can p {
		margin: 0;
	}

	#fuji-can p.fuji-brand {
		font-size: 2.5em;
		line-height: 0.9em;
		color: #fff;
		text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
	}

	#fuji-can p.fuji-num {
		font-size: 3em;
		font-weight: 800;
		color: #000;
	}

	#fuji-can p.fuji-desc {
		font-size: 0.7em;
		font-family: sans-serif;
		color: #000;
	}

	.visible {
		display: block;
		opacity: 1;
	}

	.hidden {
		display: none;
		opacity: 0;
	}
</style>
