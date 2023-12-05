import { Routes } from '~/api/routes';
import { axiosApi } from './axios';

const { NOTIFICATION_ROUTE } = Routes;

export const findNotification = async () => {
  return await axiosApi.get(NOTIFICATION_ROUTE);
};
