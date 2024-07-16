import { defineStore } from 'pinia';
import {
  findBookByCollection,
  findCollection,
  findCollections,
} from '~/entities/collection/api';
import type { CollectionParams } from '~/entities/collection/model/types';

export const useCollectionStore = defineStore('collection', () => {
  const getCollections = async (params?: CollectionParams) => {
    return await findCollections(params);
  };

  const getCollection = async (id: string, params?: CollectionParams) => {
    return await findCollection(id, params);
  };

  const getBookByCollection = async (id: string) => {
    return await findBookByCollection(id);
  };

  return {
    getCollections,
    getCollection,
    getBookByCollection,
  };
});
