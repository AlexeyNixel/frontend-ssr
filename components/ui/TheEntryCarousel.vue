<script setup lang="ts">
import TheEntryCard from '~/components/ui/TheEntryCard.vue';
import type { EntryResponseType } from '~/models/entry-model';
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';

interface Props {
  entries: EntryResponseType;
  rubric: string;
}

const translateRubric = {
  sobytiya: 'Больше событий',
  aktualnoe: 'Больше актуального',
};

const generalStore = useGeneralStore();
const { screenWidth } = storeToRefs(generalStore);

const props = defineProps<Props>();

const pageSize = computed(() => {
  if (screenWidth.value) {
    if (screenWidth.value > 1280) {
      return 2;
    } else return screenWidth.value / 600;
  }
});
</script>

<template>
  <div v-if="entries">
    <Swiper
      class="flex h-[280px]"
      :slidesPerView="pageSize"
      :spaceBetween="0"
      trigger="click"
      :breakpoints="{
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
      }"
    >
      <SwiperSlide
        class="rounded-[10px] flex h-full"
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
      class="flex justify-end mr-4 text-black dark:text-white hover:underline"
    >
      {{ translateRubric[rubric] }}
    </Nuxt-link>
  </div>
</template>
