import { defineStore } from 'pinia';
import { ParamsType } from '~/models/baseTypes';
import { findDocument, findMenu, findMenus } from '~/api/menuApi';


export const useMenuStore = defineStore('menu', () => {
  const getMenu = async (slug: string, params?: ParamsType) => {
    return await findMenu(slug, params)
  };

  const getMenus = async (params?: ParamsType) => {
    const { data } = await findMenus(params);
    return data;
  };

  const getDocument = async (params?: ParamsType) => {
    const { data } = await findDocument(params);
    return data;
  };

  return {
    getMenu,
    getMenus,
    getDocument,
  };
});