import { defineStore } from 'pinia';

export const useGeneralStore = defineStore('general', () => {
  const isWorkTime = ref<boolean>()
  const token = ref<string>()
  const isExhibition = ref<boolean>(false)
  const device = ref<string>('mobile' || 'desktop')

  return {
    isWorkTime,
    token,
    isExhibition,
    device
  }
});
