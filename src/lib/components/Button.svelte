<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';

	export let isLoading = false;
	export let isDisabled = false;
</script>

<button on:click|preventDefault disabled={isDisabled}>
	{#if isLoading}
		<Spinner />
	{:else}
		<slot />
	{/if}
</button>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: inherit;
		font-size: 1rem;
		font-weight: bold;
		border: 0;
		border-radius: 5px;
		color: #172937;
		padding: 10px 15px;
		cursor: pointer;
		width: 100%;
		max-width: 350px;
		min-height: 50px;
		text-transform: uppercase;
		background-color: #00e760;
		transition: 0.3s ease;
	}

	button:disabled {
		pointer-events: none;
		opacity: 0.3;
	}

	button:hover {
		background-color: #00be4f;
	}
</style>
