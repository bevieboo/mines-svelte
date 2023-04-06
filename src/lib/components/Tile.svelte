<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';

	export let isDisabled = false;
	export let isLoading = false;
	export let onClick: () => void;
</script>

<button class="tile" on:click|preventDefault={() => onClick()} disabled={isDisabled}>
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

	.tile:disabled {
		pointer-events: none;
		opacity: 0.25;
	}

	.tile:hover:not([disabled]) {
		background-color: #557086;
		transform: translateY(-2px);
	}
</style>
