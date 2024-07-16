import { defineStore } from 'pinia';

export const useGeneralStore = defineStore('general', () => {
  const isWorkTime = ref<boolean>(false);
  const isMap = ref<boolean>(false);
  const token = ref<string>();
  const isExhibition = ref<boolean>(false);
  const device = ref<string>('mobile' || 'desktop');
  const screenWidth = ref<number>();

  if (process.client) screenWidth.value = window.innerWidth;

  return {
    isWorkTime,
    isMap,
    token,
    isExhibition,
    device,
    screenWidth,
  };
});
