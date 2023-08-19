import { defineStore } from 'pinia';
import { findEntries, findEntry } from '~/api/entryApi';
import { EntryType, ParamsType } from '~/models/baseTypes';

export const useEntryStore = defineStore('entry', () => {
  const entries = ref<EntryType[]>();
  const entry = ref<EntryType>();

  const getEntry = async (slug: string, params?: ParamsType) => {
    const { data } = await findEntry(slug, params);
    entry.value = data;
    return entry.value;
  };

  const getEntries = async (params?: ParamsType) => {
    const { data } = await findEntries(params);
    entries.value = data;
    return entries.value;
  };

  return {
    entry,
    entries,
    getEntry,
    getEntries,
  };
});