<script setup lang="ts">
import { DepartmentCard, useDepartmentStore } from '~/entities/department';
import { storeToRefs } from 'pinia';

const departmentStore = useDepartmentStore();
const { departments } = storeToRefs(departmentStore);

useAsyncData(async () => {
  await departmentStore.getDepartments({
    include: 'preview',
  });
});
</script>

<template>
  <div class="departments" v-if="departments">
    <DepartmentCard
      v-for="item in departments"
      :key="item.id"
      :department="item"
    />
  </div>
</template>

<style lang="scss" scoped>
.departments {
  @apply justify-between my-4 hidden lg:flex;
}

.department-card {
  @apply shadow-none border-0 dark:bg-neutral-900 bg-white p-0;
  &__img {
    @apply w-full object-cover rounded-t-[10px];
  }
  &__title {
    @apply text-black dark:text-white;
  }
}
</style>
