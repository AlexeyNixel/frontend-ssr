import { baseApi } from '~/shared/api';

export const findSlider = async (params?: object) => {
  const { data } = await baseApi.get('/api/main-slider/', { params });
  return data;
};
