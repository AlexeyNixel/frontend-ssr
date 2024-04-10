<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import TheEntryCard from '~/components/ui/TheEntryCard.vue';
import type { EntryResponseType } from '~/models/entry-model';

const props = defineProps<{ rubric: string }>();
const entryStore = useEntryStore();
const entries = ref<EntryResponseType>();

entries.value = await entryStore.getEntries({
  rubric: props.rubric,
  include: 'preview',
  orderBy: '-publishedAt',
});
</script>

<template>
  <div v-if="entries">
    <Swiper
      class="flex h-[280px]"
      :slidesPerView="2"
      :spaceBetween="0"
      trigger="click"
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
      Больше новостей
    </Nuxt-link>
  </div>
</template>
