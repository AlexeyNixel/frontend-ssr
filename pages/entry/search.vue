<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import { DepartmentType, ParamsType } from '~/models/baseTypes';
import TheEntry from '~/components/ui/TheEntry.vue';
import { useDepartmentStore } from '~/stores/departmentStore';
import { useSearchStore } from '~/stores/searchStore';
import { navigateTo } from '#app';
import { storeToRefs } from 'pinia';

const paginationUi = {
  default: {
    activeButton: {
      color: 'blue',
    },
  },
};

const route = useRoute();
const entryStore = useEntryStore();
const searchStore = useSearchStore();
const departmentStore = useDepartmentStore();

const isFirstLoad = ref<boolean>(false);

const { entries } = storeToRefs(entryStore);
const { metaEntry } = storeToRefs(entryStore);

const search = ref<string>();
const pages = ref<number>(1);
const page = ref<number>(Number(route.query.page) || 1);

const orderFilters = [
  {
    name: 'По умолчанию',
    value: '',
  },
  {
    name: 'Сначала новые',
    value: '-publishedAt',
  },
  {
    name: 'Сначала старые',
    value: 'publishedAt',
  },
];

const handleClearFilter = () => {
  filters.value.departmentFilter = '';
  filters.value.orderFilter = '-publishedAt';
  filters.value.year = '';
  handleNavigate();
};

const handleNavigate = () => {
  navigateTo({
    path: '/entry/search',
    query: {
      order: filters.value.orderFilter,
      year: filters.value.year,
      departments: filters.value.departmentFilter,
      page: page.value,
    },
  });
};

const filters = ref({
  orderFilter:
    (route.query.order as string) !== ''
      ? (route.query.order as string)
      : '-publisheAt',
  year: (route.query.year as string) || '',
  departmentFilter: (route.query.department as string) || '',
});

const departments = ref<DepartmentType[]>();
departments.value = await departmentStore.getDepartments();

const fetchData = async () => {
  if (isFirstLoad.value) handleNavigate();
  if (process.client) window.scroll(0, 0);
  isFirstLoad.value = true;
  const params: ParamsType = {
    toDate: filters.value.year
      ? filters.value.year + '-12-31T00:00:00.000Z'
      : '',
    fromDate: filters.value.year
      ? filters.value.year + '-01-01T00:00:00.000Z'
      : '',
    orderBy: filters.value.orderFilter,
    search: search.value,
    include: 'preview',
    page: page.value,
  };

  if (filters.value.departmentFilter === '') {
    await entryStore.getEntries(params);
    pages.value = Number(metaEntry.value?.pages);
  } else {
    await entryStore.getEntriesByDepartment(
      filters.value.departmentFilter,
      params
    );
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
      icon="i-heroicons-magnifying-glass-20-solid"
      size="sm"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      color="white"
      :trailing="false"
      placeholder="Search..."
    >
      <template #trailing>
        <UPopover>
          <UButton variant="link">
            <Icon class="text-xl text-current" name="mdi:filter" />
          </UButton>
          <template #panel>
            <div class="p-4 w-96">
              <div class="flex justify-between items-center my-3">
                <div class="text-2xl font-bold">Фильтры</div>
                <UButton @click="handleClearFilter()">очистить</UButton>
              </div>
              <div class="">
                <div>Сортировка</div>
                <USelect
                  v-model="filters.orderFilter"
                  :options="orderFilters"
                  option-attribute="name"
                />
              </div>
              <div class="">
                <div>Год</div>
                <USelect
                  v-model="filters.year"
                  :options="searchStore.generateDate()"
                />
              </div>
              <div class="">
                <div>Отдел</div>
                <USelect
                  v-model="filters.departmentFilter"
                  :options="departments"
                  value-attribute="slug"
                  option-attribute="title"
                />
              </div>
            </div>
          </template>
        </UPopover>
      </template>
    </UInput>
    <div class="entry-list">
      <TheEntry v-for="item in entries" :key="item.id" :entry="item" />
    </div>
    <UPagination
      class="flex justify-center my-4"
      v-model="page"
      :total="pages"
      @update:model-value="fetchData()"
      :ui="paginationUi"
    />
  </div>
</template>

<style scoped lang="scss"></style>
