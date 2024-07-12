import type { NavigationParams } from '~/entities/navigation/api/navigation-params';
import { axiosApi } from '~/api/axios';

// export const findDocument = async (params?: NavigationParams) => {
//   return await axiosApi.get('/api/document/', { params });
// };

export const findDocument = async (slug: string, params?: NavigationParams) => {
  return await axiosApi.get('/api/menu-item/' + slug, { params });
};
