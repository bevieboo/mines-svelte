<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';

	export let isDisabled = false;
	export let isLoading = false;
	export let isRevealed = false;
</script>

<button
	class="tile"
	class:tile--revealed={isRevealed}
	on:click|preventDefault
	disabled={isDisabled}
>
	{#if isLoading}
		<Spinner />
	{:else}
		<slot />
	{/if}
</button>

<style>
	.tile {
		display: flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 1;
		border: 0;
		border-radius: 5px;
		background-color: #2f4554;
		cursor: pointer;
		position: relative;
		box-shadow: 0px 6px #203542;
		transition: ease-out 0.2s;
	}

	.tile--revealed {
		pointer-events: none;
	}

	.tile:disabled {
		pointer-events: none;
		opacity: 0.3;
	}

	.tile:hover:not([disabled]) {
		background-color: #557086;
		transform: translateY(-2px);
	}

	.tile :global(svg) {
		width: 80%;
		height: 80%;
	}
</style>
