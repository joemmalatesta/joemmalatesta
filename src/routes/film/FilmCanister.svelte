<script lang="ts">
	export let title: string = '404';
</script>

<div id="can" class="z-50">
    <div id="toptop" class="absolute h-4 bg-gradient-to-r from-neutral-800 via-neutral-700/70 to-neutral-800/60 w-10 -translate-y-3 translate-x-12"></div>
	<div id="topcap"></div>
	<div id="text">
		<p class="kodak" >Kodak</p>
		<p class="num">{title}</p>
		<p class="mm">35mm color for print film</p>
	</div>
	<div id="bottomcap"></div>
</div>

<style>
	#topcap,
	#bottomcap {
		position: absolute;
		left: -5px;
		width: 140px;
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
		width: 130px;
		height: 240px;
		background: linear-gradient(
			to right,
			rgba(164, 97, 8, 1) 0%,
			rgba(242, 216, 67, 1) 38%, 
			rgba(223, 150, 35, 1) 80%,
			rgba(164, 97, 8, 1) 100%
		);
	}

	#can #text {
		-webkit-transform: rotate(90deg) translate(60px, 40px);
		-moz-transform: rotate(90deg) translate(60px, 40px);
		transform: rotate(90deg) translate(60px, 40px);
		display: block;
		color: #000;
		font-family: helvetica;
		text-align: center;
		width: 200px;
	}

	#can p {
        line-height: 1.1em;
	}

	#can .kodak {
		font-size: 3.5em;
        font-weight: 900;
		line-height: 0.9em;
		transform: perspective(300px) rotateX(20deg) translateY(-20px);
        letter-spacing: -0.03em;
	}

	#can .num {
		font-size: 2.6em;
		font-weight: 900;
        transform: translateY(-15px);
        letter-spacing: 0.02em;
	}

	#can p.mm {
		font-size: 0.7em;
        font-weight: 600;
		letter-spacing: 0.12em;
        transform: translateY(-5px)
	}
</style>
