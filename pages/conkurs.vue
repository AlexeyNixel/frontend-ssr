<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import TheEntry from '~/components/ui/TheEntry.vue';
import { storeToRefs } from 'pinia';

const route = useRoute();
const entryStore = useEntryStore();
const { entries } = storeToRefs(entryStore);
const { metaEntry } = storeToRefs(entryStore);

const page = ref<number>(Number(route.query.page) || 1);

const fetchData = async () => {
  entries.value = await entryStore.getEntries({
    rubric: 'konkursy',
    include: 'preview',
    orderBy: '-publishedAt',
    page: page.value,
  });
};

const swapPage = async () => {
  navigateTo({ path: '/conkurs/', query: { page: page.value } });
  if (process.client) window.scroll(0, 0);
  await fetchData();
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <div class="flex flex-col" v-if="entries?.data">
    <div class="text-2xl font-bold my-2">Конкурсы</div>
    <the-entry v-for="item in entries.data" :key="item.id" :entry="item" :is-date="true" />
    <UPagination class="flex items-center justify-center my-4" v-model="page" @update:model-value="swapPage()"
      :total="entries?.meta.total" />
  </div>
</template>

<style scoped lang="scss"></style>
