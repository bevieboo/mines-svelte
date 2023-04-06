<script lang="ts">
	import Tile from '$lib/components/Tile.svelte';
	import Button from '$lib/components/Button.svelte';
	import { GameAction } from '$lib/enums/GameAction';
	import { game, revealTiles, startGame } from '$lib/stores/GameStore';
	import Mine from '$lib/components/Icons/Mine.svelte';
	import Gem from '$lib/components/Icons/Gem.svelte';

	const ROWS = 5;
	const COLUMNS = 5;
	const gridTemplate = `grid-template-columns: repeat(${COLUMNS}, minmax(auto, 80px))`;

	let isButtonLoading = false;
	let loadingTile: number | null;

	const onButtonClick = async () => {
		isButtonLoading = true;
		await startGame();
		isButtonLoading = false;
		console.log($game);
	};

	const handleTileClick = async (i: number) => {
		loadingTile = i;
		await revealTiles(i);
		loadingTile = null;
		console.log($game);
	};

	const getTextForButton = (): string => {
		if ($game?.state === 'busted') {
			return GameAction.PlayAgain;
		}
		if ($game?.state === 'progress' && $game.revealedTiles.length) {
			return GameAction.CashOut;
		}

		return GameAction.Bet;
	};
</script>

<div style={gridTemplate} class="game">
	{#each new Array(ROWS * COLUMNS).fill(null) as tile, i}
		<Tile onClick={() => handleTileClick(i)} isDisabled={!$game} isLoading={loadingTile === i}>
			{#if $game?.mines.includes(i)}
				<Mine />
			{:else if $game?.revealedTiles.includes(i)}
				<Gem />
			{/if}
		</Tile>
	{/each}
</div>
<Button
	onClick={onButtonClick}
	isLoading={isButtonLoading}
	isDisabled={$game?.state === 'progress' && !$game.revealedTiles.length}
	text={getTextForButton()}
/>

<style>
	.game {
		display: grid;
		grid-gap: 15px 10px;
		justify-content: center;
		align-self: center;
		margin-bottom: 40px;
	}
</style>
