import { findEntryPinned } from './../api/entryApi';
import { defineStore } from 'pinia';
import {
  findEntries,
  findEntriesByDepartment,
  findEntriesByRubric,
  findEntry,
} from '~/api/entryApi';
import { EntryType, MetaType, ParamsType } from '~/models/baseTypes';

export const useEntryStore = defineStore('entry', () => {
  const entries = ref<EntryType[]>();
  const entry = ref<EntryType>();
  const metaEntry = ref<MetaType>({ pages: 1, page: 1, pageSize: 10 });

  const getEntry = async (slug: string, params?: ParamsType) => {
    entry.value = await findEntry(slug, params);
    return entry.value;
  };

  const getEntryPinned = async ():Promise<EntryType> => {
    entry.value = await findEntryPinned();
    return entry.value;
  };

  const getEntries = async (params?: ParamsType) => {
    const { data, meta } = await findEntries(params);
    metaEntry.value = meta;
    entries.value = data;
    return { data, meta };
  };

  const getEntriesByRubric = async (
    rubric: string,
    params?: ParamsType
  ): Promise<any> => {
    const { data, meta } = await findEntriesByRubric(rubric, params);
    metaEntry.value = meta;
    entries.value = data;
    return data;
  };

  const getEntriesByDepartment = async (
    department: string,
    params?: ParamsType
  ): Promise<any> => {
    const { data, meta } = await findEntriesByDepartment(department, params);
    entries.value = data;
    metaEntry.value = meta;
    return entries.value;
  };

  return {
    entry,
    entries,
    metaEntry,
    getEntry,
    getEntries,
    getEntryPinned,
    getEntriesByRubric,
    getEntriesByDepartment,
  };
});
