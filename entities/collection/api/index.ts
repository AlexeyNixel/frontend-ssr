import { axiosApi } from '~/api/axios';
import type {
  CollectionModel,
  CollectionParams,
} from '~/entities/collection/model/types';

export const findCollections = async (
  params?: CollectionParams
): Promise<CollectionModel[]> => {
  return await axiosApi.get('/api/collection/', { params });
};

export const findCollection = async (
  id: string,
  params?: CollectionParams
): Promise<CollectionModel[]> => {
  return await axiosApi.get('/api/collection/' + id, { params });
};

export const findBookByCollection = async (
  id: string,
  params?: CollectionParams
) => {
  return await axiosApi.get('/api/collection/' + 'books/' + id, { params });
};
