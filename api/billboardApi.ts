
import { axiosApi } from '@/api/axios';
import { Routes } from '@/api/routes';
import { BillboardType, ParamsType } from '~/models/baseTypes';

const { AFFICHE_ROUTE } = Routes;
export const findBillboards = async (params?: ParamsType) => {
  // @ts-ignore
  const { data, meta } = await axiosApi.get(AFFICHE_ROUTE, { params });
  return { data, meta };
};

export const findBillboard = async (slug: string, params?: ParamsType): Promise<BillboardType> => {
  return await axiosApi.get(`${AFFICHE_ROUTE}${slug}`, { params });
};
