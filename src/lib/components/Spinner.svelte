<div class="spinner" />

<style>
	.spinner {
		position: absolute;
		width: 25px;
		height: 25px;
		pointer-events: none;
		vertical-align: middle;
		transform-origin: top left;
	}

	.spinner:after {
		content: ' ';
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid #fff;
		border-color: #fff transparent #fff transparent;
		animation: spinner 1.2s linear infinite;
	}

	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
