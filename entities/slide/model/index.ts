import { defineStore } from 'pinia';
import { findSlider } from '~/entities/slide/api';
import { type SliderType } from './types';

export const useSliderStore = defineStore('slider', () => {
  const slides = ref<SliderType[]>([]);
  const getSlides = async (params?: object) => {
    slides.value = await findSlider(params);
  };

  return {
    slides,
    getSlides,
  };
});
