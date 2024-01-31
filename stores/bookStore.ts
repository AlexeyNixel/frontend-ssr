import { ParamsType } from './../models/baseTypes';
import { findAll, findOne } from './../api/book';

import { defineStore } from 'pinia';

export const useBookStore = defineStore('book', () => {
  const getAll = async (params?: ParamsType) => {
    const { data, meta } = await findAll(params);

    return { data, meta };
  };

  const getOne = async (id: string): Promise<any> => {
    return await findOne(id);
  };

  return {
    getAll,
    getOne,
  };
});
