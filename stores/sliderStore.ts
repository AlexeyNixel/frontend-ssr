import { defineStore } from 'pinia';
import { findSlider } from '~/api/sliderApi';

export const useSliderStore = defineStore('slider', () => {
  const slides = ref<any>()
  const getSlides = async (params?: object) => {
    const {data} = await findSlider(params)
    slides.value = data
  }

  return {
    slides,
    getSlides,
  }
})