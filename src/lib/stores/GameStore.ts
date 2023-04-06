import { writable } from 'svelte/store';
import { minesBet, type CasinoGameMines, minesNext } from '$lib/api/api';

export const game = writable<CasinoGameMines | null>(null);

export const startGame = async () => {
	const gameState: CasinoGameMines = await minesBet();
	game.set(gameState);
};

export const revealTiles = async (index: number) => {
	const gameState: CasinoGameMines = await minesNext(index);
	game.set(gameState);
};
