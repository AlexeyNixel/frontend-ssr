import { Routes } from '~/api/routes';
import { axiosApi } from '~/api/axios';
import type {
  CollectionModel,
  CollectionParams,
} from '~/models/collection-model';

const { COLLECTION_ROUTE } = Routes;

export const findCollections = async (
  params?: CollectionParams
): Promise<CollectionModel[]> => {
  return await axiosApi.get(COLLECTION_ROUTE, { params });
};

export const findCollection = async (
  id: string,
  params?: CollectionParams
): Promise<CollectionModel[]> => {
  return await axiosApi.get(COLLECTION_ROUTE + id, { params });
};

export const findBookByCollection = async (
  id: string,
  params?: CollectionParams
) => {
  return await axiosApi.get(COLLECTION_ROUTE + 'books/' + id, { params });
};