<script setup lang="ts">
import Filter from '~/widgets/filter/ui/Filter.vue';
import { useEntryStore } from '~/entities/entry';
import EntryList from '~/widgets/entry-list/ui/EntryList.vue';

const entryStore = useEntryStore();

const isShowNoEntryMessage = ref(false);
const search = ref<string>('');
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
const filters = ref({
  orderBy: '-publishedAt',
  department: '',
  rubric: '',
  year: '',
  search: '',
});

const fetchEntries = async () => {
  const { error } = await entryStore.getEntries({
    include: 'preview',
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
  if (error) {
    isShowNoEntryMessage.value = true;
  }
};

useAsyncData(async () => {
  await fetchEntries();
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
      @keydown.enter="handleNavigate(1)"
      variant="none"
      icon="i-heroicons-magnifying-glass-20-solid"
      :ui="inputUi"
      placeholder="Поиск..."
      v-model="filters.search"
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
