<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useEntryStore } from '~/stores/entryStore';
import TheEntry from '~/components/ui/TheEntry.vue';
import { EntryType } from '~/models/baseTypes';

const ruMenu: { [key: string]: string } = {
  anonsy: 'Анонсы',
  aktualnoe: 'Актуальное',
  sobytiya: 'События',
};

const route = useRoute();
const entryStore = useEntryStore();

const { metaEntry } = storeToRefs(entryStore);
const { entries } = storeToRefs(entryStore);

const page = ref<number>(1);
const slug = ref<string>(route.params.slug as string);

const swapPage = () => {
  navigateTo({
    path: `/entry/rubric/${slug.value}`,
    query: { page: page.value },
  });
  fetchData();
};

const fetchData = async () => {
  if (process.client) window.scroll(0, 0);
  await entryStore.getEntriesByRubric(slug.value, {
    orderBy: '-publishedAt',
    include: 'preview',
    page: page.value,
  });
};

fetchData();
</script>

<template>
  <div class="text-2xl font-bold mx-2">{{ ruMenu[slug] }}</div>
  <TheEntry :entry="item" v-for="item in entries" :key="item.id"></TheEntry>
  <UPagination
    class="flex justify-center my-4"
    v-model="page"
    :total="Number(metaEntry?.pages) * 10"
    @update:model-value="swapPage()"
  />
</template>

<style lang="scss" scoped></style>
