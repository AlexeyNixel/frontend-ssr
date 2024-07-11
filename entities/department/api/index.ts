import { axiosApi } from '~/api/axios';
import type { ParamsType } from '~/models/baseTypes';

export const findDepartments = async (params?: ParamsType) => {
  return (await axiosApi.get('/api/department/', { params })).data;
};
