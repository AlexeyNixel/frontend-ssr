<script setup lang="ts">
import type { EntryResponseType } from '../model/types';
import { Navigation } from 'swiper/modules';
import EntryCard from '~/entities/entry/ui/EntryCard.vue';

interface Props {
  entries: EntryResponseType;
  rubric?: string;
  mobile?: boolean;
}

const props = defineProps<Props>();
const translateRubric = {
  sobytiya: 'Больше событий',
  aktualnoe: 'Больше актуального',
};

const breakpoints = {
  1280: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 1.5,
  },

  641: {
    slidesPerView: 1,
  },

  540: {
    slidesPerView: 3,
  },
  440: {
    slidesPerView: 2,
  },
  360: {
    slidesPerView: 1.5,
  },
};
</script>

<template>
  <div class="entry-carousel" v-if="entries">
    <Swiper
      class="slider"
      :spaceBetween="0"
      :modules="[Navigation]"
      :navigation="true"
      trigger="click"
      :breakpoints="breakpoints"
    >
      <SwiperSlide
        class="slider__item"
        v-for="item in entries.data"
        :key="item.id"
      >
        <entry-card :entry="item" />
      </SwiperSlide>
    </Swiper>
    <Nuxt-link
      v-if="rubric"
      :to="{ path: '/entry/search', query: { rubric: rubric } }"
      class="entry-carousel__rubric-link"
    >
      {{ translateRubric[rubric] }}
    </Nuxt-link>
  </div>
</template>

<style scoped lang="scss">
.entry-carousel {
  &__rubric-link {
    @apply hidden sm:flex justify-end mr-4 text-black dark:text-white hover:underline;
  }
}

.slider {
  @apply flex h-[280px];

  &__item {
    @apply rounded-[10px] flex h-full justify-center;
  }
}
</style>
