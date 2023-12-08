<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import { DepartmentType, ParamsType } from '~/models/baseTypes';
import TheEntry from '~/components/ui/TheEntry.vue';
import { useDepartmentStore } from '~/stores/departmentStore';
import { useSearchStore } from '~/stores/searchStore';
import { navigateTo } from '#app';
import { storeToRefs } from 'pinia';
import TheFilter from '~/components/TheFilter.vue';

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

const { entries } = storeToRefs(entryStore);
const { metaEntry } = storeToRefs(entryStore);
const { filters } = storeToRefs(searchStore);

const search = ref<string>(route.query.search as string);
const pages = ref<number>(1);
const page = ref<number>(Number(route.query.page) || 1);

const handleNavigate = (val?: number) => {
  if (val) page.value = val;
  
  navigateTo({
    path: '/entry/search',
    query: {
      order: filters.value.orderFilter,
      year: filters.value.year,
      departments: filters.value.departmentFilter,
      page: val || page.value,
      search: search.value,
    },
  });
  fetchData();
};

const fetchData = async () => {
  if (process.client) window.scroll(0, 0);

  const params = ref<ParamsType>({
    toDate: filters.value.year
      ? filters.value.year + '-12-31T00:00:00.000Z'
      : '',
    fromDate: filters.value.year
      ? filters.value.year + '-01-01T00:00:00.000Z'
      : '',
    orderBy: filters.value.orderFilter,
    include: 'preview',
  });

  if (filters.value.departmentFilter === '') {
    await entryStore.getEntries({
      page: page.value,
      search: search.value,
      ...params.value,
    });
    pages.value = Number(metaEntry.value?.pages);
  } else {
    await entryStore.getEntriesByDepartment(filters.value.departmentFilter, {
      page: page.value,
      search: search.value,
      ...params.value,
    });
    pages.value = Number(metaEntry.value?.pages);
  }
};

fetchData();

watch(filters.value, () => {
  page.value = 1;
  fetchData();
});
</script>

<template>
  <div>
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
        <TheFilter />
      </template>
    </UInput>
    <div class="entry-list">
      <TheEntry v-for="item in entries" :key="item.id" :entry="item" />
    </div>
    <UPagination
      class="flex justify-center my-4"
      v-model="page"
      :total="pages * 10"
      @update:model-value="handleNavigate()"
    />
  </div>
</template>

<style scoped lang="scss"></style>
