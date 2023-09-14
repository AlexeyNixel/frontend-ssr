import { defineStore } from 'pinia';

export const useGeneralStore = defineStore('general', () => {
  const isWorkTime = ref<boolean>()
  const token = ref<string>()

  return {
    isWorkTime,
    token
  }
});
