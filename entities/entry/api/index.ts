import type { EntryParams } from '~/entities/entry/api/entry-params';
import { axiosApi } from '~/api/axios';

export const fetchEntries = async (params?: EntryParams) => {
  return await axiosApi.get('/api/entry', { params });
};

export const fetchEntryById = async (
  id: string,
  params?: EntryParams
): Promise<any> => {
  return await axiosApi.get('/api/entry/' + id, { params });
};

export const findEntryPinned = async () => {
  return await axiosApi.get('/api/entry/' + 'pinned');
};
