<script setup lang='ts'>
import { useSliderStore } from '~/stores/sliderStore';
import { storeToRefs } from 'pinia';

const sliderStore = useSliderStore();
const { slides } = storeToRefs(sliderStore);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL'])

sliderStore.getSlides({include:'image,entry'});
</script>

<template>
  <div>
    <el-carousel class='slider' trigger="click" height="22vw">
      <el-carousel-item class='slider__item' v-for="item in slides" :key="item.id">
        <img class='slider__img' :src='staticUrl+item.image.path' alt=''>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang='scss'>
.slider {
  margin: 1vw 0;
  border-radius: 10px;
  &__img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}
</style>