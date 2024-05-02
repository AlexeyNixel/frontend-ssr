<script setup lang="ts">
import { useSliderStore } from '~/stores/sliderStore';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '~/stores/generalStore';

const ui = {
  base: 'animate-pulse',
  background: 'bg-gray-300 dark:bg-gray-800',
};

const generalStore = useGeneralStore();
const sliderStore = useSliderStore();

const { slides } = storeToRefs(sliderStore);
const isLoading = computed(() => slides.value.length > 0);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

await sliderStore.getSlides({
  include: 'image,entry',
  orderBy: '-createdAt',
  pageSize: 10,
});
</script>

<template>
  <USkeleton
    :ui="ui"
    v-if="!isLoading"
    class="slider"
  />
  <Swiper
    v-else
    :modules="[SwiperAutoplay]"
    :loop="true"
    :autoplay="{ delay: 6000, disableOnInteraction: true }"
    class="slider"
  >
    <SwiperSlide
      class="rounded-[10px] h-full"
      v-for="item in slides"
      :key="item.id"
    >
      <a
        v-if="item.url"
        :href="item.url"
        target="_blank"
        class="h-full"
      >
        <img
          class="w-full h-full rounded-[10px]"
          :src="staticUrl + item.image.path"
          alt=""
        />
      </a>
      <NuxtLink
        v-else
        :to="`/entry/${item.entry.slug}`"
      >
        <img
          class="w-full h-full rounded-[10px]"
          :src="staticUrl + item.image.path"
          alt=""
        />
      </NuxtLink>
      <NuxtLink
        v-if="!item.entry && !item.url"
        to="#"
      >
        <img
          class="w-full h-full rounded-[10px]"
          :src="staticUrl + item.image.path"
          alt=""
        />
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped lang="scss">
.slider {
  @apply h-[30vw] sm:h-[200px] md:h-[240px] lg:h-[320px] xl:h-[400px] 2xl:h-[400px] w-full;
}
</style>
