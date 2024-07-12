import { axiosApi } from '~/api/axios';
import { type NavigationParams } from './navigation-params';

export const findMenu = async (slug: string, params?: NavigationParams) => {
  return await axiosApi.get('/api/menu-item/' + slug, { params });
};

export const findMenus = async (params?: NavigationParams) => {
  return (await axiosApi.get('/api/menu/', { params })).data;
};

export const findDocument = async (params?: NavigationParams) => {
  return await axiosApi.get('/api/document/', { params });
};
