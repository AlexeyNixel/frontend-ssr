import { Routes } from '~/api/routes';
import { baseApi } from '~/shared/api';
import { type ParamsType } from '~/shared/types/base';

const { GENRE_ROUTE, GAMES_ROUTE, GAMES_RANDOM_ROUTE } = Routes;

export const findGames = async (params?: ParamsType) => {
  //@ts-ignore
  const { data, meta } = await baseApi.get(GAMES_ROUTE, { params });
  return { data, meta };
};

export const findGamesRandom = async (): Promise<any> => {
  return await baseApi.get(GAMES_RANDOM_ROUTE);
};

export const findGame = async (
  slug: string,
  params?: ParamsType
): Promise<any> => {
  return await baseApi.get(`${GAMES_ROUTE}${slug}`, { params });
};

export const findGenres = async (): Promise<any> => {
  return await baseApi.get(GENRE_ROUTE);
};
