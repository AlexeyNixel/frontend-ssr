import type { NavigationParams } from '~/entities/navigation/api/navigation-params';
import { baseApi } from '~/shared/api';

export const findDocument = async (slug: string, params?: NavigationParams) => {
  return await baseApi.get('/api/menu-item/' + slug, { params });
};
