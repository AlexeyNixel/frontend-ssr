import { Routes } from '~/api/routes';
import { axiosApi } from './axios';

const { RUBRIC_ROUTE } = Routes;

export const findRubric = async (slug: string) => {
  return await axiosApi.get(`${RUBRIC_ROUTE}${slug}`);
};
