import { defineStore } from 'pinia';
import { findFiles } from '~/api/fileApi';
import { ParamsType } from '~/models/baseTypes';

export const useFileStore = defineStore('file', () => {
  const files = ref()
  const metaFile = ref()
  const getFiles = async (params?: ParamsType) => {
    //@ts-ignore
    const { data, meta } = await findFiles(params);
    files.value = data
    metaFile.value = meta
    return data
  };

  return {
    files,
    metaFile,
    getFiles,
  }
});