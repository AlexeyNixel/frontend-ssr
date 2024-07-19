<script setup lang="ts">
import {
  EntryPlate,
  type EntryResponseType,
  useEntryStore,
} from '~/entities/entry';

import { navigateTo } from '#app';
import Filter from '~/widgets/filter/ui/Filter.vue';

const ui = {
  icon: {
    trailing: {
      pointer: '',
    },
  },
  rounded: 'rounded-[10px]',
  variant: {
    none: 'bg-white dark:bg-neutral-900 border-0 shadow-0 focus:ring-{color}-500 dark:focus:ring-{color}-400',
  },
};

const route = useRoute();
const entryStore = useEntryStore();

const entries = ref<EntryResponseType>();

const filters = reactive({
  order: (route.query.order as string) || '-publishedAt',
  department: route.query.department || '',
  rubric: route.query.rubric || '',
  year: route.query.year || '',
});

const search = ref<string>(route.query.search as string);
const pages = ref<number>(1);
const page = ref<number>(Number(route.query.page) || 1);

const handleNavigate = (val?: number) => {
  if (val) page.value = val;

  navigateTo({
    path: '/entry/search',
    query: {
      page: val || page.value,
      search: search.value,
      ...filters,
    },
  });
  fetchData();
};

const fetchData = async () => {
  if (process.client) window.scroll(0, 0);
  entries.value = await entryStore.getEntries({
    page: page.value,
    search: search.value,
    toDate: filters.year ? filters.year + '-12-31T00:00:00.000Z' : undefined,
    fromDate: filters.year ? filters.year + '-01-01T00:00:00.000Z' : undefined,
    orderBy: filters.order,
    include: 'preview',
    department: (filters.department as string) || undefined,
    rubric: (filters.rubric as string) || undefined,
  });
  pages.value = Number(entries.value?.meta?.total);
};
await fetchData();

watch(filters, () => {
  handleNavigate();
  page.value = 1;
});
</script>

<template>
  <div v-if="entries">
    <UInput
      @keydown.enter="handleNavigate(1)"
      variant="none"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="sm"
      :ui="ui"
      color="white"
      :trailing="false"
      placeholder="Поиск..."
      v-model="search"
    >
      <template #trailing>
        <Filter v-model="filters" />
      </template>
    </UInput>
    <div class="entry-list">
      <EntryPlate
        v-for="entry in entries.data"
        :key="entry.id"
        :entry="entry"
        date
        size="full"
      />
    </div>
    <UPagination
      class="flex justify-center my-4"
      v-model="page"
      :page-count="entries.meta?.pageSize"
      :total="entries.meta?.total"
      @update:model-value="handleNavigate()"
    />
  </div>
</template>

<style scoped lang="scss"></style>
