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
  const entries = ref<EntryResponseType>();
  const entryPinned = ref<EntryType>();
  const anonsy = ref<EntryResponseType>();
  const aktualnoe = ref<EntryResponseType>();
  const sobytiya = ref<EntryResponseType>();

  const getEntries = async (params?: EntryParams): Promise<any> => {
    const result = await fetchEntries(params);

    if (result.data.length < 1) {
      return { error: 'not-found', result: undefined };
    }

    entries.value = result;

    return { result: entries.value, error: null };
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
    entries,
    anonsy,
    aktualnoe,
    sobytiya,
    entryPinned,
    getEntryById,
    getEntryPinned,
    getEntries,
  };
});
