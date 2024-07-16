import { baseApi } from '~/shared/api';
import type { ParamsType } from '~/shared/types/base';

export const findExhibitions = async (params?: ParamsType) => {
  return await baseApi.get('/api/file/', { params });
};
