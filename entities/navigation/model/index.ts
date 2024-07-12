import { type NavigationParams } from '~/entities/navigation/api/navigation-params';
import { findDocument, findMenu, findMenus } from '~/entities/navigation/api';
import { type MenuType } from '~/entities/navigation/model/types';
import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', () => {
  const menus = ref<MenuType[]>();

  const getMenu = async (slug: string, params?: NavigationParams) => {
    return await findMenu(slug, params);
  };

  const getMenus = async (params?: NavigationParams) => {
    menus.value = await findMenus(params);
    return menus.value;
  };

  const getDocument = async (params?: NavigationParams) => {
    const { data } = await findDocument(params);
    return data;
  };

  return {
    getMenu,
    getMenus,
    getDocument,
  };
});
