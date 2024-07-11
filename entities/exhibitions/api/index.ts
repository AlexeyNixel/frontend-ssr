import { type ParamsType } from '~/models/baseTypes';
import { axiosApi } from '~/api/axios';

export const findExhibitions = async (params?: ParamsType) => {
  return await axiosApi.get('/api/file/', { params });
};
