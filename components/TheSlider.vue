<script setup lang='ts'>
import { useSliderStore } from '~/stores/sliderStore';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '~/stores/generalStore';

const generalStore = useGeneralStore()

const sliderStore = useSliderStore();
const { slides } = storeToRefs(sliderStore);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL'])

await sliderStore.getSlides({include:'image,entry'});

</script>

<template>
  <div>
    <el-carousel class='slider' trigger="click" height="22vw">
      <el-carousel-item class='slider__item' v-for="item in slides" :key="item.id">
        <NuxtLink :to='`/entry/${item?.entry.slug}`'>
          <img class='slider__img' :src='staticUrl+item.image.path' alt=''>

        </NuxtLink>
        <NuxtLink to='/' class='slider__icon'>
          <font-awesome-icon v-if='generalStore.token'  icon='fa-solid fa-gear' />
        </NuxtLink>
      </el-carousel-item>

    </el-carousel>
  </div>
</template>

<style scoped lang='scss'>
.slider {
  margin: 1vh 0;
  border-radius: 10px;
  &__img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  &__icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.4rem;
    color: red;
    margin: .5vw;
  }
}
</style>