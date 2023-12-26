<script setup lang="ts">
import { EntryType } from 'models/baseTypes';
import { useEntryStore } from '~/stores/entryStore';
import TheEntryCard from '~/components/ui/TheEntryCard.vue';

const props = defineProps<{ rubric: string }>();
const entryStore = useEntryStore();
const entries = ref<EntryType[]>();
const width = computed(() => {
  if (process.client) return window.innerWidth;
});
entries.value = await entryStore.getEntriesByRubric(props.rubric, {
  include: 'preview',
  orderBy: '-createdAt',
});
</script>

<template>
  <div>
    <Swiper
      class="flex h-[280px]"
      :slidesPerView="2"
      :spaceBetween="0"
      trigger="click"
    >
      <SwiperSlide
        class="rounded-[10px] flex h-full"
        v-for="item in entries"
        :key="item.id"
      >
        <TheEntryCard class="h-full" :entry="item" />
      </SwiperSlide>
    </Swiper>
    <Nuxt-link
      :to="`/entry/rubric/${props.rubric}`"
      class="flex justify-end mr-4"
    >
      Больше новостей
    </Nuxt-link>
  </div>
</template>

<style scoped lang="scss"></style>
