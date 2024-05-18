<script setup lang="ts">
import TheEntryCard from '~/components/ui/TheEntryCard.vue';
import type { EntryResponseType } from '~/models/entry-model';
import { Navigation } from 'swiper/modules';

interface Props {
  entries: EntryResponseType;
  rubric: string;
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
  768: {
    slidesPerView: 1,
  },
  640: {
    slidesPerView: 1,
  },
};
</script>

<template>
  <div
    class="entry-carousel"
    v-if="entries"
  >
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
        <TheEntryCard
          class="h-full"
          :entry="item"
        />
      </SwiperSlide>
    </Swiper>
    <Nuxt-link
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
    @apply flex justify-end mr-4 text-black dark:text-white hover:underline;
  }
}

.slider {
  @apply flex h-[280px];

  &__item {
    @apply rounded-[10px] flex h-full;
  }
}
</style>
