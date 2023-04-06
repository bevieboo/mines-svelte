<script lang="ts">
	import Tile from '$lib/components/Tile.svelte';
	import Button from '$lib/components/Button.svelte';
	import { GameAction } from '$lib/enums/GameAction';
	import { cashout, game, revealTiles, startGame } from '$lib/stores/GameStore';
	import Mine from '$lib/components/Icons/Mine.svelte';
	import Gem from '$lib/components/Icons/Gem.svelte';

	const ROWS = 5;
	const COLUMNS = 5;
	const gridTemplate = `grid-template-columns: repeat(${COLUMNS}, minmax(auto, 80px))`;

	let isButtonLoading = false;
	let loadingTile: number | null;

	const onButtonClick = async () => {
		isButtonLoading = true;

		if ($game?.state === 'progress') {
			await cashout();
		} else if (!$game || $game?.state === 'busted' || $game?.state === 'cashout') {
			await startGame();
		}

		isButtonLoading = false;
	};

	const handleTileClick = async (i: number) => {
		loadingTile = i;
		if (loadingTile) await revealTiles(i);
		loadingTile = null;
		console.log($game);
	};
</script>

<div style={gridTemplate} class="game">
	{#each new Array(ROWS * COLUMNS).fill(null) as tile, i}
		<Tile
			on:click={() => handleTileClick(i)}
			isLoading={loadingTile === i}
			isDisabled={!$game ||
				(($game?.state === 'busted' || $game?.state === 'cashout') &&
					!$game.revealedTiles.includes(i))}
			isRevealed={$game?.state === 'busted' || $game?.revealedTiles.includes(i)}
		>
			{#if $game?.mines.includes(i)}
				<Mine />
			{:else if $game?.revealedTiles.includes(i) || $game?.state === 'busted' || $game?.state === 'cashout'}
				<Gem />
			{/if}
		</Tile>
	{/each}
</div>

<Button
	on:click={onButtonClick}
	isLoading={isButtonLoading}
	isDisabled={$game?.state === 'progress' && !$game.revealedTiles.length}
>
	{#if $game?.state === 'busted' || $game?.state === 'cashout'}
		{GameAction.PlayAgain}
	{:else if $game?.state === 'progress' && $game.revealedTiles.length}
		{GameAction.CashOut}
	{:else}
		{GameAction.Bet}
	{/if}
</Button>

<style>
	.game {
		display: grid;
		grid-gap: 15px 10px;
		justify-content: center;
		align-self: center;
		margin-bottom: 40px;
	}
</style>
