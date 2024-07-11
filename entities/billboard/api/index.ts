import { axiosApi } from '@/api/axios';
import { type BillboardType } from '../model/types';
import { type ParamsType } from '~/models/baseTypes';

export const findBillboards = async (
  params?: ParamsType
): Promise<BillboardType[]> => {
  return (await axiosApi.get('/api/affiche/', { params })).data;
};

export const findBillboard = async (
  slug: string,
  params?: ParamsType
): Promise<BillboardType> => {
  return await axiosApi.get(`/api/affiche/${slug}`, { params });
};
