<script lang="ts">
	import Game from '$lib/components/Game.svelte';
</script>

<div class="app">
	<Game />
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
	}

	.app {
		width: 100vw;
		height: 100vh;
		background-color: #172937;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 50px 15px 0;
	}
</style>
