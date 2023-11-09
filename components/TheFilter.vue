<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDepartmentStore } from '~/stores/departmentStore';
import { useSearchStore } from '~/stores/searchStore';

const searchStore = useSearchStore();
const departmentStore = useDepartmentStore();

const { filters } = storeToRefs(searchStore);
const { orderFilters } = storeToRefs(searchStore);
const { departments } = storeToRefs(departmentStore);

await departmentStore.getDepartments();
</script>

<template>
  <UPopover>
    <UButton variant="link">
      <Icon class="text-xl text-current" name="mdi:filter" />
    </UButton>
    <template #panel>
      <div class="p-4 w-96">
        <div class="flex justify-between items-center my-3">
          <div class="text-2xl font-bold">Фильтры</div>
          <UButton @click="searchStore.clearFilter()">очистить</UButton>
        </div>
        <div class="item">
          <div>Сортировка</div>
          <USelect
            v-model="filters.orderFilter"
            :options="orderFilters"
            option-attribute="name"
          />
        </div>
        <div class="item">
          <div>Год</div>
          <USelect
            v-model="filters.year"
            :options="searchStore.generateDate()"
          />
        </div>
        <div class="item">
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

<style scoped lang="scss">
.item {
  @apply my-3;
}
</style>
