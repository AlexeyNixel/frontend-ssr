import { axiosApi } from '~/api/axios';
import type { ParamsType } from '~/shared/types/base';

export const findAll = async (params?: ParamsType) => {
  return await axiosApi.get('/api/book/', { params });
};

export const findOne = async (id: string) => {
  return await axiosApi.get(`/api/book/${id}`);
};
