import { Routes } from '~/api/routes';
import { axiosApi } from '~/api/axios';

const { ENTRY_ROUTE } = Routes;

export const findEntries = async (params?: any) => {
  const { data } = await axiosApi.get(ENTRY_ROUTE, { params });
  return data;
};

export const findEntry = async (slug: string, params?: any) => {
  const { data } = await axiosApi.get(
    `${ENTRY_ROUTE}${slug}`,
    { params },
  );
  return data;
};