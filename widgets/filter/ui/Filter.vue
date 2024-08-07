<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDepartmentStore } from '~/entities/department';
import { useFilterStore } from '~/widgets/filter/model';

interface Props {
  modelValue: {
    orderBy: string;
    department: string;
    rubric: string;
    year: string;
  };
}

const orderBy = defineModel('orderBy');
const department = defineModel('department');
const year = defineModel('year');

const props = defineProps<Props>();

const searchStore = useFilterStore();
const departmentStore = useDepartmentStore();

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
      <Icon class="link__icon" name="mdi:filter" />
    </UButton>
    <template #panel>
      <div class="filters">
        <div class="header">
          <div class="header__title">Фильтр</div>
          <UButton @click="handleClearFilter" class="header__btn">
            очистить
          </UButton>
        </div>
        <div class="body">
          <div class="filter">
            <div class="filter__title">Сортировка</div>
            <div class="filter__element">
              <USelect
                v-model="modelValue.orderBy"
                :options="orderFilters"
                option-attribute="name"
              />
            </div>
          </div>
          <div class="filter">
            <div class="filter__title">Год</div>
            <div class="filter__element">
              <USelect
                placeholder="Год"
                v-model="modelValue.year"
                :options="searchStore.generateDate()"
              />
            </div>
          </div>
          <div class="filter">
            <div class="filter__title">Отдел</div>
            <div class="filter__element">
              <USelect
                placeholder="Отдел"
                v-model="modelValue.department"
                :options="departments"
                value-attribute="slug"
                option-attribute="title"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<style scoped lang="scss">
.link {
  &__icon {
    @apply text-xl text-current text-neutral-400 hover:text-neutral-600 transition;
  }
}
.filters {
  @apply w-96 p-3;
  .header {
    @apply flex justify-between mb-3;

    &__title {
      @apply text-xl font-bold;
    }
  }

  .body {
    .filter {
      @apply my-2;
    }
  }
}
</style>
