import { axiosApi } from '~/api/axios';
import { Routes } from '~/api/routes';
import { ParamsType } from '~/models/baseTypes';


const { FILE_ROUTE } = Routes;

export const findFiles = async (params?: ParamsType) => {
  //@ts-ignore
  const { data, meta } = await axiosApi.get(FILE_ROUTE, { params });
  return { data, meta };
};