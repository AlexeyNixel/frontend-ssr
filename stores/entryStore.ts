import { defineStore } from 'pinia';
import { findEntries, findEntriesByDepartment, findEntriesByRubric, findEntry } from '~/api/entryApi';
import { EntryType, ParamsType } from '~/models/baseTypes';

export const useEntryStore = defineStore('entry', () => {
  const entries = ref<EntryType[]>();
  const entry = ref<EntryType>();

  const getEntry = async (slug: string, params?: ParamsType) => {
    entry.value = await findEntry(slug, params);
    return entry.value;
  };

  const getEntries = async (params?: ParamsType) => {
    const { data, meta } = await findEntries(params);
    entries.value = data;
    return {data, meta};
  };

  const getEntriesByRubric = async (rubric: string, params?: ParamsType): Promise<any> => {
    const { data } = await findEntriesByRubric(rubric, params);
    entries.value = data;
    return entries.value;
  };

  const getEntriesByDepartment = async (department: string, params?: ParamsType): Promise<any> => {
    const { data } = await findEntriesByDepartment(department, params);
    console.log(data);
    entries.value = data;
    return entries.value;
  };

  return {
    entry,
    entries,
    getEntry,
    getEntries,
    getEntriesByRubric,
    getEntriesByDepartment,
  };
});