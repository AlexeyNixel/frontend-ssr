import { defineStore } from 'pinia';
import { findExhibitions } from '../api';
import { type ParamsType } from '~/shared/types/base';

export const useExhibitionStore = defineStore('exhibition', () => {
  const files = ref();
  const metaFile = ref();

  const getExhibitions = async (params?: ParamsType) => {
    return await findExhibitions(params);
  };

  return {
    files,
    metaFile,
    getExhibitions,
  };
});
