import { defineStore } from 'pinia';
import { findAll, findOne } from '~/entities/book/api';
import { type BookParams } from '~/entities/book/api/book-params';

export const useBookStore = defineStore('book', () => {
  const getAll = async (params?: BookParams): Promise<any> => {
    return await findAll(params);
  };

  const getOne = async (id: string): Promise<any> => {
    return await findOne(id);
  };

  return {
    getAll,
    getOne,
  };
});
