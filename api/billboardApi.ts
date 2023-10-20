
import { axiosApi } from '@/api/axios';
import { Routes } from '@/api/routes';
import { BillboardType, ParamsType } from '~/models/baseTypes';

const { AFFICHE_ROUTE } = Routes;
export const findBillboards = async (params?: ParamsType):Promise<BillboardType[]> => {
  // @ts-ignore
  const { data } = await axiosApi.get(AFFICHE_ROUTE, { params });
  return data;
};

export const findBillboard = async (slug: string, params?: ParamsType): Promise<BillboardType> => {
  return await axiosApi.get(`${AFFICHE_ROUTE}${slug}`, { params });
};
