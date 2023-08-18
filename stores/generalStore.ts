import { defineStore } from 'pinia';

export const useGeneralStore = defineStore('general', () => {
  const isWorkTime = ref<boolean>()

  return {
    isWorkTime,
  }
});
