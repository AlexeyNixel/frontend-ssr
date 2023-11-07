<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import TheEntry from '~/components/ui/TheEntry.vue';
import { storeToRefs } from 'pinia';

const route = useRoute();
const entryStore = useEntryStore();
const { entries } = storeToRefs(entryStore);
const { metaEntry } = storeToRefs(entryStore);

const page = ref<number>(Number(route.query.page) || 1);

const swapPage = async () => {
  navigateTo({ path: '/conkurs/', query: { page: page.value } });
  if (process.client) window.scroll(0, 0);
  entries.value = await entryStore.getEntriesByRubric('konkursy', {
    include: 'preview',
    orderBy: '-publishedAt',
    page: page.value,
  });
};

entries.value = await entryStore.getEntriesByRubric('konkursy', {
  include: 'preview',
  orderBy: '-publishedAt',
  page: page.value,
});
</script>

<template>
  <div class="flex flex-col">
    <div class="text-2xl font-bold my-2">Конкурсы</div>
    <the-entry
      v-for="item in entries"
      :key="item.id"
      :entry="item"
      :is-date="true"
    />
    <UPagination
      class="flex items-center justify-center my-4"
      v-model="page"
      @update:model-value="swapPage()"
      :total="metaEntry.pages * 10"
    />
  </div>
</template>

<style scoped lang="scss"></style>
