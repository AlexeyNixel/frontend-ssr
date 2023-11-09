import { Routes } from '~/api/routes';
import { axiosApi } from '~/api/axios';
import { EntryType, MetaType, ParamsType } from '~/models/baseTypes';

const { ENTRY_ROUTE } = Routes;
const { RUBRIC_ROUTE } = Routes;
const { DEPARTMENT_ROUTE } = Routes;

export const findEntries = async (params?: ParamsType) => {
  const metaEntry = ref<MetaType>();
  //@ts-ignore
  const { data, meta } = await axiosApi.get(ENTRY_ROUTE, { params });
  return { data, meta };
};

export const findEntry = async (
  slug: string,
  params?: ParamsType
): Promise<EntryType> => {
  // axiosApi.get(`${ENTRY_ROUTE}${slug}`, { params });
  return await $fetch(`http://api.infomania.ru${ENTRY_ROUTE}${slug}`, {
    params,
  });
};

export const findEntriesByDepartment = async (
  slug?: string,
  params?: ParamsType
): Promise<any> => {
  //@ts-ignore
  const { data, meta } = await axiosApi.get(
    `${DEPARTMENT_ROUTE}${slug}/entries`,
    { params: params }
  );
  return { data, meta };
};

export const findEntriesByRubric = async (
  slug?: string,
  params?: ParamsType
): Promise<any> => {
  // @ts-ignore
  const { data, meta } = await axiosApi.get(`${RUBRIC_ROUTE}${slug}/entries`, {
    params,
  });
  return { data, meta };
};
