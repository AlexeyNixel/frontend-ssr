<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDepartmentStore } from '~/entities/department';
import { useSearchStore } from '~/stores/searchStore';

interface Props {
  modelValue: {
    orderBy: string;
    department: string;
    rubric: string;
    year: string;
  };
}

const props = defineProps<Props>();

const searchStore = useSearchStore();
const departmentStore = useDepartmentStore();

// const { filters } = storeToRefs(searchStore);
const { orderFilters } = storeToRefs(searchStore);
const { departments } = storeToRefs(departmentStore);

const handleClearFilter = () => {
  props.modelValue.department = '';
  props.modelValue.year = '';
  props.modelValue.rubric = '';
  props.modelValue.orderBy = '';
};

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
          <UButton @click="handleClearFilter">очистить</UButton>
        </div>
        <div class="item">
          <div>Сортировка</div>
          <USelect
            v-model="modelValue.orderBy"
            :options="orderFilters"
            option-attribute="name"
          />
        </div>
        <div class="item">
          <div>Год</div>
          <USelect
            v-model="modelValue.year"
            :options="searchStore.generateDate()"
          />
        </div>
        <div class="item">
          <div>Отдел</div>
          <USelect
            v-model="modelValue.department"
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
