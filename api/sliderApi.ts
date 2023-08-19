import { axiosApi } from '~/api/axios';
import { Routes } from '~/api/routes';

const { MAIN_SLIDER_ROUTE } = Routes;

export const findSlider = async (params?: object) => {
  const { data } = await axiosApi.get(MAIN_SLIDER_ROUTE, {params});
  return data;
};

