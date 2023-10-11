import { Routes } from '~/api/routes';
import { axiosApi } from '~/api/axios';
import { ParamsType } from '~/models/baseTypes';

const { ENTRY_ROUTE } = Routes;
const { RUBRIC_ROUTE } = Routes;
const { DEPARTMENT_ROUTE } = Routes;

export const findEntries = async (params?: ParamsType) => {
  const { data } = await axiosApi.get(ENTRY_ROUTE, { params });
  return data;
};

export const findEntry = async (slug: string, params?: ParamsType) => {
  const { data } = await axiosApi.get(
    `${ENTRY_ROUTE}${slug}`,
    { params },
  );
  return data;
};

export const findEntriesByDepartment = async (slug?: string, params?: ParamsType): Promise<any> => {
  //@ts-ignore
  const { data, meta } = await axiosApi.get(`${DEPARTMENT_ROUTE}${slug}/entries`, { params: params });
  return { data, meta };
};

export const findEntriesByRubric = async (slug?: string, params?: ParamsType): Promise<any> => {
  // @ts-ignore
  const { data, meta } = await axiosApi.get(`${RUBRIC_ROUTE}${slug}/entries`, { params });
  return { data, meta };
};