<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import { DepartmentType, ParamsType } from '~/models/baseTypes';
import TheEntry from '~/components/ui/TheEntry.vue';
import { useDepartmentStore } from '~/stores/departmentStore';
import { useSearchStore } from '~/stores/searchStore';
import { navigateTo } from '#app';
import { storeToRefs } from 'pinia';
import TheFilter from '~/components/TheFilter.vue';
import { EntryQuery, EntryResponseType } from 'models/entry-model';

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
const searchStore = useSearchStore();

const entries = ref<EntryResponseType>();
const { metaEntry } = storeToRefs(entryStore);
// const { filters } = storeToRefs(searchStore);

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
  pages.value = Number(metaEntry.value?.pages);
  console.log(entries.value);
};

fetchData();

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
        <TheFilter v-model="filters" />
      </template>
    </UInput>
    <div class="entry-list">
      <TheEntry v-for="item in entries.data" :key="item.id" :entry="item" />
    </div>
    <UPagination
      class="flex justify-center my-4"
      v-model="page"
      :page-count="entries.meta.pageSize"
      :total="entries.meta.total"
      @update:model-value="handleNavigate()"
    />
  </div>
</template>

<style scoped lang="scss"></style>
