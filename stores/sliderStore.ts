import { defineStore } from 'pinia';
import { findSlider } from '~/api/sliderApi';
import { SliderType } from '~/models/baseTypes';

export const useSliderStore = defineStore('slider', () => {
  const slides = ref<SliderType[]>()
  const getSlides = async (params?: object) => {
    const {data} = await findSlider(params)
    slides.value = data
  }

  return {
    slides,
    getSlides,
  }
})