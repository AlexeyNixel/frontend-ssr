import { defineStore } from 'pinia';
import { findEntries, findEntriesByRubric, findEntry } from '~/api/entryApi';
import { EntryType, ParamsType } from '~/models/baseTypes';

export const useEntryStore = defineStore('entry', () => {
  const entries = ref<EntryType[]>();
  const entry = ref<EntryType>();

  const getEntry = async (slug: string, params?: ParamsType) => {
    entry.value = await findEntry(slug, params);
    return entry.value;
  };

  const getEntries = async (params?: ParamsType) => {
    const { data } = await findEntries(params);
    entries.value = data;
    return entries.value;
  };

  const getEntriesByRubric = async (rubric: string, params?: ParamsType): Promise<any> => {
    const {data} = await findEntriesByRubric(rubric, params);
    entries.value = data
    return entries.value;
  };

  return {
    entry,
    entries,
    getEntry,
    getEntries,
    getEntriesByRubric,
  };
});