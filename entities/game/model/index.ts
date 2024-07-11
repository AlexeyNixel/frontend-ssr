import { findGame, findGames, findGamesRandom, findGenres } from '../api';
import { type GameType, type GenresType } from '~/entities/game';
import { defineStore } from 'pinia';
import type { ParamsType } from '~/models/baseTypes';

export const useGameStore = defineStore('games', () => {
  const games = ref<GameType[]>([]);
  const game = ref<GameType>();
  const genres = ref<GenresType[]>();
  const metaGames = ref<Meta>();

  const getGames = async (params?: ParamsType) => {
    return await findGames(params);
  };
  const getGamesRandom = async () => {
    games.value = await findGamesRandom();
  };

  const getGame = async (slug: string, params?: ParamsType): Promise<any> => {
    const data = await findGame(slug, params);
    game.value = data;
    return data;
  };

  const getGenres = async (): Promise<any> => {
    genres.value = await findGenres();
    return genres.value;
  };

  return {
    genres,
    games,
    game,
    metaGames,
    getGames,
    getGamesRandom,
    getGame,
    getGenres,
  };
});
