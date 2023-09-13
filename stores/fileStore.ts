import { defineStore } from 'pinia';
import { findFiles } from '~/api/fileApi';
import { ParamsType } from '~/models/baseTypes';

export const useFileStore = defineStore('file', () => {
  const getFiles = async (params?: ParamsType) => {
    const { data } = await findFiles(params);
    return data
  };

  return {
    getFiles,

  }
});