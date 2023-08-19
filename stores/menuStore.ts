import { defineStore } from 'pinia';
import { ParamsType } from '~/models/baseTypes';
import { findMenus } from '~/api/menuApi';

export const useMenuStore = defineStore('menu', () => {
  const getMenus = async (params?: ParamsType) => {
    const { data } = await findMenus(params);
    return data;
  };

  return {
    getMenus,
  }
});