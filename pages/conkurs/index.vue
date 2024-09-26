<script setup lang="ts">
import {
  EntryPlate,
  type EntryResponseType,
  useEntryStore,
} from '~/entities/entry';

const route = useRoute();
const entryStore = useEntryStore();
const entries = ref<EntryResponseType>();

const page = ref<number>(Number(route.query.page) || 1);

const fetchData = async () => {
  const { result } = await entryStore.getEntries({
    rubric: 'konkursy',
    include: 'preview',
    orderBy: '-publishedAt',
    page: page.value,
  });
  entries.value = result;
  console.log(entries.value);
};

const swapPage = async () => {
  navigateTo({ path: '/conkurs', query: { page: page.value } });
  if (process.client) window.scroll(0, 0);
  await fetchData();
};

useAsyncData(async () => {
  await fetchData();
});
</script>

<template>
  <div class="" v-if="entries">
    <div class="text-2xl font-bold my-2">Конкурсы</div>
    <entry-plate
      v-for="item in entries.data"
      :key="item.id"
      :entry="item"
      :is-date="true"
      class="entry"
    />
    <UPagination
      v-if="entries.meta"
      class="flex items-center justify-center my-4"
      v-model="page"
      :page-count="entries.meta.pageSize"
      :total="entries.meta.total"
      @update:model-value="swapPage()"
    />
  </div>
</template>

<style scoped lang="scss">
.entry {
  @apply my-2;
}
</style>
