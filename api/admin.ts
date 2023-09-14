import { axiosApi } from '~/api/axios';
import { Routes } from '~/api/routes';

const { LOGIN_ROUTE } = Routes;

export const auth = async (data: object) => {
  return await axiosApi.post(LOGIN_ROUTE, data)
}