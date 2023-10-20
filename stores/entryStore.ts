import { defineStore } from 'pinia';
import { findEntries, findEntriesByDepartment, findEntriesByRubric, findEntry } from '~/api/entryApi';
import { EntryType, MetaType, ParamsType } from '~/models/baseTypes';

export const useEntryStore = defineStore('entry', () => {
  const entries = ref<EntryType[]>();
  const entry = ref<EntryType>();
  const metaEntry = ref<MetaType>()

  const getEntry = async (slug: string, params?: ParamsType) => {
    entry.value = await findEntry(slug, params);
    return entry.value;
  };

  const getEntries = async (params?: ParamsType) => {
    const { data, meta } = await findEntries(params);
    metaEntry.value = meta
    entries.value = data;
    return { data, meta };
  };

  const getEntriesByRubric = async (rubric: string, params?: ParamsType): Promise<any> => {
    const { data } = await findEntriesByRubric(rubric, params);
    entries.value = data;
    return entries.value;
  };

  const getEntriesByDepartment = async (department: string, params?: ParamsType): Promise<any> => {
    const { data, meta } = await findEntriesByDepartment(department, params);
    entries.value = data;
    metaEntry.value = meta
    return entries.value;
  };

  return {
    entry,
    entries,
    metaEntry,
    getEntry,
    getEntries,
    getEntriesByRubric,
    getEntriesByDepartment,
  };
});