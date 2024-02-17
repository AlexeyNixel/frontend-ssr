import { EntryQuery } from '../models/entry-model';
import { Routes } from '~/api/routes';
import { axiosApi } from '~/api/axios';
import { EntryType, MetaType, ParamsType } from '~/models/baseTypes';
import { EntryResponseType } from 'models/entry-model';

const { ENTRY_ROUTE } = Routes;
const { RUBRIC_ROUTE } = Routes;
const { DEPARTMENT_ROUTE } = Routes;

export const findEntries = async (
  params?: EntryQuery
): Promise<EntryResponseType> => {
  return await axiosApi.get(ENTRY_ROUTE, { params });
};

export const findEntryPinned = async (): Promise<EntryType> => {
  const data = await axiosApi.get(ENTRY_ROUTE + 'pinned');
  return data;
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
