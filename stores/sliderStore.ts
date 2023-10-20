import { defineStore } from 'pinia';
import { findSlider } from '~/api/sliderApi';
import { SliderType } from '~/models/baseTypes';

export const useSliderStore = defineStore('slider', () => {
  const slides = ref<SliderType[]>()
  const getSlides = async (params?: object) => {
    slides.value = await findSlider(params)
  }

  return {
    slides,
    getSlides,
  }
})