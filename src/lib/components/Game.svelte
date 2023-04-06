<script lang="ts">
	import { onMount } from 'svelte';
	import Tile from '$lib/components/Tile.svelte';
	import Button from '$lib/components/Button.svelte';
	import Mine from '$lib/components/Icons/Mine.svelte';
	import Gem from '$lib/components/Icons/Gem.svelte';
	import { COLUMNS, ROWS } from '$lib/constants';
	import { GameAction } from '$lib/enums/GameAction';
	import { cashout, game, revealTiles, startGame } from '$lib/stores/GameStore';

	import gemSound from '$lib/sounds/gem.mp3';
	import mineSound from '$lib/sounds/mine.mp3';
	import startSound from '$lib/sounds/start.mp3';

	const gridTemplate = `grid-template-columns: repeat(${COLUMNS}, minmax(auto, 80px))`;
	let isButtonLoading = false;
	let loadingTile: number | null;

	let startAudio: HTMLAudioElement;
	let gemAudio: HTMLAudioElement;
	let mineAudio: HTMLAudioElement;

	onMount(() => {
		startAudio = new Audio(startSound);
		gemAudio = new Audio(gemSound);
		mineAudio = new Audio(mineSound);
	});

	const onButtonClick = async () => {
		isButtonLoading = true;

		if ($game?.state === 'progress') {
			await cashout();
			startAudio.play();
		} else if ($game?.state === 'busted' || $game?.state === 'cashout') {
			await startGame();
			startAudio.play();
		} else if (!$game) {
			await startGame();
			startAudio.play();
		}

		isButtonLoading = false;
	};

	const handleTileClick = async (i: number) => {
		loadingTile = i;
		if (loadingTile) {
			await revealTiles(i);
			$game?.state === 'busted' ? mineAudio.play() : gemAudio.play();
		}
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
