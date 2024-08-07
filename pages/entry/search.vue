<script setup lang="ts">
import Filter from '~/widgets/filter/ui/Filter.vue';
import { useEntryStore } from '~/entities/entry';
import EntryList from '~/widgets/entry-list/ui/EntryList.vue';

const entryStore = useEntryStore();

const route = useRoute();
const page = ref(Number(route.query.page) || 1);
const isShowNoEntryMessage = ref(false);
const search = ref<string>('');
const filters = ref({
  orderBy: '-publishedAt',
  department: '',
  rubric: '',
  year: '',
  search: '',
});

const inputUi = {
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

const fetchEntries = async () => {
  const { error } = await entryStore.getEntries({
    include: 'preview',
    page: page.value,
    orderBy: filters.value.orderBy,
    search: search.value || undefined,
    department: filters.value.department || undefined,
    rubric: filters.value.rubric || undefined,
    toDate: filters.value.year
      ? filters.value.year + '-12-31T00:00:00.000Z'
      : undefined,
    fromDate: filters.value.year
      ? filters.value.year + '-01-01T00:00:00.000Z'
      : undefined,
  });

  isShowNoEntryMessage.value = !!error;
};
const handleNavigate = () => {
  navigateTo({ path: '/entry/search', query: { page: page.value } });
  fetchEntries();
};

onMounted(() => {
  fetchEntries();
});

watch(
  filters,
  () => {
    fetchEntries();
  },
  { deep: true }
);
</script>

<template>
  <div class="entry-search">
    <UInput
      class="entry-search__input"
      @keydown.enter="fetchEntries()"
      variant="none"
      icon="i-heroicons-magnifying-glass-20-solid"
      :ui="inputUi"
      placeholder="Поиск..."
      v-model="search"
    >
      <template #trailing>
        <Filter
          v-model="filters"
          v-model:order-by="filters.orderBy"
          v-model:department="filters.department"
          v-model:year="filters.year"
        />
      </template>
    </UInput>
    <div
      class="entries-list"
      v-if="!isShowNoEntryMessage && entryStore.entries"
    >
      <EntryList :entries="entryStore.entries.data" />
      <UPagination
        class="flex justify-center my-4"
        v-model="page"
        :page-count="entryStore.entries.meta.pageSize"
        :total="entryStore.entries.meta.total"
        @update:model-value="handleNavigate()"
      />
    </div>
    <div class="empty" v-else>Новости не найдены</div>
  </div>
</template>

<style scoped lang="scss">
.entry-search {
  .empty {
    @apply h-full flex items-center justify-center m-auto text-xl font-bold my-12;
  }
}
</style>
