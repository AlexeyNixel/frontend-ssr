import { axiosApi } from '~/api/axios';
import { Routes } from '~/api/routes';
import { ParamsType } from '~/models/baseTypes';

const { MENU_ROUTE } = Routes;

export const findMenus = async (params?: ParamsType) => {
  const { data } = await axiosApi.get(MENU_ROUTE, { params });
  return data;
};