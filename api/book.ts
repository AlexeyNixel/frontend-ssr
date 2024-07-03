import type { ParamsType } from '~/models/baseTypes';
import { Routes } from '~/api/routes';
import { axiosApi } from './axios';

const { BOOK_ROUTE } = Routes;

export const findAll = async (params?: ParamsType) => {
  //@ts-ignore
  const { data, meta } = await axiosApi.get(BOOK_ROUTE, { params });
  return { data, meta };
};

export const findOne = async (id: string) => {
  return await axiosApi.get(`${BOOK_ROUTE}${id}`);
};
