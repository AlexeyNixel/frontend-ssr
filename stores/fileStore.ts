import { defineStore } from 'pinia';
import { findFiles } from '~/api/fileApi';
import { ParamsType } from '~/models/baseTypes';

export const useFileStore = defineStore('file', () => {
  const files = ref();
  const metaFile = ref();
  const getFiles = async (params?: ParamsType) => {
    return await findFiles(params);
  };

  return {
    files,
    metaFile,
    getFiles,
  };
});
