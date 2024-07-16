import { type BillboardType } from '../model/types';
import { baseApi } from '~/shared/api';
import { type ParamsType } from '~/shared/types/base';

export const findBillboards = async (
  params?: ParamsType
): Promise<BillboardType[]> => {
  return (await baseApi.get('/api/affiche/', { params })).data;
};

export const findBillboard = async (
  slug: string,
  params?: ParamsType
): Promise<BillboardType> => {
  return await baseApi.get(`/api/affiche/${slug}`, { params });
};
