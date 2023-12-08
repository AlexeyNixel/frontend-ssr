import { findRubric } from './../api/rubric';
import { defineStore } from 'pinia';

export const useRubricStore = defineStore('rubric', () => {
  const getRubric = async (slug: string): Promise<any> => {
    return await findRubric(slug);
  };

  return {
    getRubric,
  };
});
