import { ParamsType } from '~/models/baseTypes';
import { axiosApi } from '~/api/axios';
import { Routes } from '~/api/routes';

const { DEPARTMENT_ROUTE } = Routes;

export const findDepartments = async (params?: ParamsType) => {
  return axiosApi.get(DEPARTMENT_ROUTE, { params });
};