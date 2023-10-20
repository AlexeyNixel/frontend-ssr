import { defineStore } from 'pinia';
import { MenuType, ParamsType } from '~/models/baseTypes';
import { findDocument, findMenu, findMenus } from '~/api/menuApi';


export const useMenuStore = defineStore('menu', () => {
  const menus = ref<MenuType[]>()

  const getMenu = async (slug: string, params?: ParamsType) => {
    return await findMenu(slug, params)
  };

  const getMenus = async (params?: ParamsType) => {
    menus.value = await findMenus(params);
    return menus.value;
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