<div id="film">
	<ul>
		<li><a href="http://instagram.com/p/VxWSkNsIoL/"></a></li>
		<li><a href="http://instagram.com/p/SeVewsMIpT/"></a></li>
		<li><a href="http://instagram.com/p/Xd7ibYMIhC/"></a></li>
	</ul>
</div>
<div id="can">
	<div id="topcap"></div>
	<div id="text">
		<p class="gold">GOLD</p>
		<p class="num">400</p>
		<p class="mm">35mm film for color prints</p>
	</div>
	<div id="bottomcap"></div>
</div>

<style>
	img {
		max-width: 100%;
	}

	#topcap,
	#bottomcap {
		position: absolute;
		left: -5px;
		width: 130px;
		height: 10px;
		background: -webkit-linear-gradient(
			left,
			rgba(63, 63, 63, 1) 0%,
			rgba(0, 0, 0, 1) 17%,
			rgba(86, 86, 86, 1) 39%,
			rgba(14, 14, 14, 1) 89%,
			rgba(71, 71, 71, 1) 100%
		); /* Chrome10+,Safari5.1+ */
		background: -o-linear-gradient(
			left,
			rgba(63, 63, 63, 1) 0%,
			rgba(0, 0, 0, 1) 17%,
			rgba(86, 86, 86, 1) 39%,
			rgba(14, 14, 14, 1) 89%,
			rgba(71, 71, 71, 1) 100%
		); /* Opera 11.10+ */
		background: -ms-linear-gradient(
			left,
			rgba(63, 63, 63, 1) 0%,
			rgba(0, 0, 0, 1) 17%,
			rgba(86, 86, 86, 1) 39%,
			rgba(14, 14, 14, 1) 89%,
			rgba(71, 71, 71, 1) 100%
		); /* IE10+ */
		background: linear-gradient(
			to right,
			rgba(63, 63, 63, 1) 0%,
			rgba(0, 0, 0, 1) 17%,
			rgba(86, 86, 86, 1) 39%,
			rgba(14, 14, 14, 1) 89%,
			rgba(71, 71, 71, 1) 100%
		); /* W3C */
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
		background: -webkit-linear-gradient(
			left,
			rgba(164, 97, 8, 1) 0%,
			rgba(242, 216, 67, 1) 38%,
			rgba(223, 150, 35, 1) 80%,
			rgba(164, 97, 8, 1) 100%
		); /* Chrome10+,Safari5.1+ */
		background: -o-linear-gradient(
			left,
			rgba(164, 97, 8, 1) 0%,
			rgba(242, 216, 67, 1) 38%,
			rgba(223, 150, 35, 1) 80%,
			rgba(164, 97, 8, 1) 100%
		); /* Opera 11.10+ */
		background: -ms-linear-gradient(
			left,
			rgba(164, 97, 8, 1) 0%,
			rgba(242, 216, 67, 1) 38%,
			rgba(223, 150, 35, 1) 80%,
			rgba(164, 97, 8, 1) 100%
		); /* IE10+ */
		background: linear-gradient(
			to right,
			rgba(164, 97, 8, 1) 0%,
			rgba(242, 216, 67, 1) 38%,
			rgba(223, 150, 35, 1) 80%,
			rgba(164, 97, 8, 1) 100%
		); /* W3C */
	}

	#can #text {
		-webkit-transform: rotate(90deg) translate(60px, 40px);
		-moz-transform: rotate(90deg) translate(60px, 40px);
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

	#can p.gold {
		font-size: 3em;
		line-height: 0.9em;
	}

	#can p.num {
		font-size: 2em;
		font-style: italic;
	}

	#can p.mm {
		font-size: 0.8em;
		font-family: serif;
	}

	#film {
		position: absolute;
		top: 35px;
		left: 160px;
		width: 150px;
		overflow: hidden;
		transition: all 1s;
	}

	#film:hover {
		width: 560px;
	}

	#film:hover ul {
		-webkit-transform: translatex(0px);
		-moz-transform: translatex(0px);
		transform: translatex(0px);
	}

	ul {
		-webkit-transform: translatex(-450px);
		-moz-transform: translatex(-450px);
		transform: translatex(-450px);
		transition: all 1s;
		width: 560px;
		height: 166px;
		padding: 0;
		margin: 0;
		list-style: none;
		border-style: solid;
		border-width: 17px 0px;
		-moz-border-image: url(https://i.imgur.com/Sm9CNai.png) 27 repeat stretch;
		-webkit-border-image: url(https://i.imgur.com/Sm9CNai.png) 27 repeat stretch;
		-o-border-image: url(https://i.imgur.com/Sm9CNai.png) 27 repeat stretch;
		border-image: url(https://i.imgur.com/Sm9CNai.png) 27 fill repeat stretch;
	}

	ul li {
		display: block;
		width: 160px;
		height: 160px;
		margin: 3px 0px 20px 20px;
		background: #000;
		float: left;
	}

	ul li a {
		display: block;
		width: 100%;
		height: 100%;
		background-size: contain;
	}

	ul li:nth-child(1) a {
		background-image: url('https://i.imgur.com/Lku1729.jpg');
	}

	ul li:nth-child(2) a {
		background-image: url('https://i.imgur.com/oNJO97c.jpg');
	}

	ul li:nth-child(3) a {
		background-image: url('https://i.imgur.com/ykouQv2.jpg');
	}
</style>
