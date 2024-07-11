import { axiosApi } from '~/api/axios';
import { Routes } from '~/api/routes';
import { type ParamsType } from '~/models/baseTypes';

const { GENRE_ROUTE, GAMES_ROUTE, GAMES_RANDOM_ROUTE } = Routes;

export const findGames = async (params?: ParamsType) => {
  //@ts-ignore
  const { data, meta } = await axiosApi.get(GAMES_ROUTE, { params });
  return { data, meta };
};

export const findGamesRandom = async (): Promise<any> => {
  return await axiosApi.get(GAMES_RANDOM_ROUTE);
};

export const findGame = async (
  slug: string,
  params?: ParamsType
): Promise<any> => {
  return await axiosApi.get(`${GAMES_ROUTE}${slug}`, { params });
};

export const findGenres = async (): Promise<any> => {
  return await axiosApi.get(GENRE_ROUTE);
};
