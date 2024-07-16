import { baseApi } from '~/shared/api';
import type { ParamsType } from '~/shared/types/base';

export const findDepartments = async (params?: ParamsType) => {
  return (await baseApi.get('/api/department/', { params })).data;
};
