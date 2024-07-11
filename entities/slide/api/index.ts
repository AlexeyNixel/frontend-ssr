import { axiosApi } from '~/api/axios';

export const findSlider = async (params?: object) => {
  const { data } = await axiosApi.get('/api/main-slider/', { params });
  return data;
};
