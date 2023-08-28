import { axiosApi } from '~/api/axios';
import { Routes } from '~/api/routes';
import { ParamsType } from '~/models/baseTypes';

const { MENU_ROUTE } = Routes;
const { DOCUMENT_ROUTE } = Routes;
const { MENU_ITEM_ROUTE } = Routes;

export const findMenu = async (slug:string, params?: ParamsType) => {
  return await axiosApi.get(`${MENU_ITEM_ROUTE}${slug}`, {params})
};

export const findMenus = async (params?: ParamsType) => {
  const { data } = await axiosApi.get(MENU_ROUTE, { params });
  return data;
};

export const findDocument = async (params?: ParamsType) => {
  return await axiosApi.get(DOCUMENT_ROUTE, {params})
}