import { type NavigationParams } from './navigation-params';
import { baseApi } from '~/shared/api';

export const findMenu = async (slug: string, params?: NavigationParams) => {
  return await baseApi.get('/api/menu-item/' + slug, { params });
};

export const findMenus = async (params?: NavigationParams) => {
  return (await baseApi.get('/api/menu/', { params })).data;
};

export const findDocument = async (params?: NavigationParams) => {
  return await baseApi.get('/api/document/', { params });
};
