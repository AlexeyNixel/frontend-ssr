import { defineStore } from 'pinia';
import {
  type EntryResponseType,
  type EntryType,
} from '~/entities/entry/model/types';
import { type EntryParams } from '../api/entry-params';
import { EntryApi } from '../index';
import { fetchEntries, findEntryPinned } from '~/entities/entry/api';

export const useEntryStore = defineStore('entry', () => {
  const entry = ref<EntryType>();
  const entryPinned = ref<any>();
  const anonsy = ref<EntryResponseType>();
  const aktualnoe = ref<EntryResponseType>();
  const sobytiya = ref<EntryResponseType>();

  const getEntries = async (params?: EntryParams): Promise<any> => {
    return await fetchEntries(params);
  };

  const getEntryById = async (id: string, params?: EntryParams) => {
    const result = await EntryApi.fetchEntryById(id, params);
    if (!result) {
      return { result: null, error: 'not found' };
    }
    entry.value = result;
    return { result, error: null };
  };

  const getEntryPinned = async () => {
    entryPinned.value = await findEntryPinned();
  };

  return {
    entry,
    anonsy,
    aktualnoe,
    sobytiya,
    entryPinned,
    getEntryById,
    getEntryPinned,
    getEntries,
  };
});
