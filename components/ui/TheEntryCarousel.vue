<script setup lang="ts">
import { EntryType } from 'models/baseTypes';
import { useEntryStore } from '~/stores/entryStore';
import TheEntryCard from '~/components/ui/TheEntryCard.vue';

const props = defineProps<{ rubric: string }>();
const entryStore = useEntryStore();
const entries = ref<EntryType[]>();

entries.value = await entryStore.getEntriesByRubric(props.rubric, {
  include: 'preview',
  orderBy: '-createdAt',
});
</script>
<template>
  <Swiper class="" :slidesPerView="2" :spaceBetween="0" trigger="click">
    <SwiperSlide
      class="rounded-[10px] flex"
      v-for="item in entries"
      :key="item.id"
    >
      <TheEntryCard class="flex" :entry="item" />
    </SwiperSlide>
  </Swiper>
</template>

<style scoped lang="scss"></style>
