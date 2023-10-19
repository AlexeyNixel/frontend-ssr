<script setup lang='ts'>
import { useSliderStore } from '~/stores/sliderStore';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '~/stores/generalStore';

const generalStore = useGeneralStore();

const sliderStore = useSliderStore();
const { slides } = storeToRefs(sliderStore);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

await sliderStore.getSlides({ include: 'image,entry' });
</script>

<template>
  <div v-if='slides'>
    <Swiper
      :modules='[SwiperAutoplay]'
      :loop='true'
      :autoplay='{delay: 6000,disableOnInteraction: true,}'
      class='slider'
    >
      <SwiperSlide class='slider__item' v-for='item in slides' :key='item.id'>
        <a class='slider__link' v-if='item.url' :href='item.url' target='_blank'>
          <img class='slider__img' :src='staticUrl+item.image.path' alt=''>
        </a>
        <NuxtLink class='slider__link' v-else :to='`/entry/${item.entry.slug}`'>
          <img class='slider__img' :src='staticUrl+item.image.path' alt=''>
        </NuxtLink>
        <NuxtLink
          :to='`http://admin.infomania.ru/slides/update/${item.id}`'
          class='slider__update'
          v-if='generalStore.token'
        >
          <font-awesome-icon v-if='generalStore.token' icon='fa-solid fa-gear' />
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang='scss'>
.slider {
  margin: 1vh 0;
  border-radius: 10px;
  height: 22vw;

  &__img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  &__update {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.4rem;
    color: red;
    margin: .5vw;
  }
}
@media (min-width: 320px) and (max-width: 991px) {
  .slider {
    height: 30vw;
  }
}
</style>