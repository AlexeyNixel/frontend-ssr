import { axiosApi } from '~/api/axios';
import { Routes } from '~/api/routes';
import { ParamsType } from '~/models/baseTypes';

const { GAMES_ROUTE } = Routes;
const { GENRE_ROUTE } = Routes;

export const findGames = async (params?: ParamsType) => {
  //@ts-ignore
  const { data, meta } = await axiosApi.get(GAMES_ROUTE, { params });
  return { data, meta };
};

export const findGenres = async (): Promise<any> => {
  return await axiosApi.get(GENRE_ROUTE);
};
