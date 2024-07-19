import { type EntryParams } from '~/entities/entry/api/entry-params';
import { baseApi } from '~/shared/api';
import type { EntryType } from '~/entities/entry';

export const fetchEntries = async (params?: EntryParams) => {
  return await baseApi.get('/api/entry', { params });
};

export const fetchEntryById = async (
  id: string,
  params?: EntryParams
): Promise<any> => {
  return await baseApi.get('/api/entry/' + id, { params });
};

export const findEntryPinned = async (): Promise<EntryType> => {
  return await baseApi.get('/api/entry/' + 'pinned');
};
