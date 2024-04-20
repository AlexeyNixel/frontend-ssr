import { findEntryPinned } from '~/api/entryApi';
import { defineStore } from 'pinia';
import { findEntries, findEntry } from '~/api/entryApi';
import type { EntryType, MetaType, ParamsType } from '~/models/baseTypes';
import type { EntryQuery, EntryResponseType } from '~/models/entry-model';

export const useEntryStore = defineStore('entry', () => {
  const entries = ref<EntryType[]>();
  const entry = ref<EntryType>();
  const metaEntry = ref<MetaType>({ pages: 1, page: 1, pageSize: 10 });
  const anonsy = ref<EntryResponseType>();
  const aktualnoe = ref<EntryResponseType>();
  const sobytiya = ref<EntryResponseType>();

  const getEntries = async (
    params?: EntryQuery
  ): Promise<EntryResponseType> => {
    return await findEntries(params);
  };

  const getEntry = async (slug: string, params?: ParamsType) => {
    entry.value = await findEntry(slug, params);
    return entry.value;
  };

  const getEntryPinned = async (): Promise<EntryType> => {
    entry.value = await findEntryPinned();
    return entry.value;
  };

  return {
    entry,
    entries,
    anonsy,
    aktualnoe,
    sobytiya,
    metaEntry,
    // entriesByRubric,
    getEntry,
    getEntries,
    getEntryPinned,
  };
});
