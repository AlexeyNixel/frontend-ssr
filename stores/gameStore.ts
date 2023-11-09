import { findGames, findGenres } from '~/api/games';
import { defineStore } from 'pinia';
import type { GameType, ParamsType, MetaType } from '~/models/baseTypes';

export const useGameStore = defineStore('game', () => {
  interface Meta {
    page: number;
    pageSize: number;
    pages: number;
    count: number;
  }

  interface Genres {
    tag: string;
    desc: string;
    value?: boolean;
  }

  const games = ref<GameType[]>();
  const genres = ref<Genres[]>();
  const metaGames = ref<Meta>();

  const getGames = async (params?: ParamsType) => {
    const { data, meta } = await findGames(params);
    metaGames.value = meta;
    games.value = data;
    return data;
  };

  const getGenres = async () => {
    genres.value = await findGenres();
  };

  return {
    genres,
    games,
    metaGames,
    getGames,
    getGenres,
  };
});
