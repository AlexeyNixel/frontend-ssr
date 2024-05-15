<script setup lang="ts">
import { useDepartmentStore } from '~/stores/departmentStore';
import type { DepartmentType } from '~/models/baseTypes';

const departmentStore = useDepartmentStore();
const departments = ref<DepartmentType[]>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

departments.value = await departmentStore.getDepartments({
  include: 'preview',
});
</script>

<template>
  <div class="departments">
    <nuxt-link
      class="departments__item"
      :to="{ path: '/entry/search', query: { department: item.slug } }"
      v-for="item in departments"
      :key="item.id"
    >
      <UCard
        class="department-card"
        :ui="{
          header: {
            padding: 'p-0 sm:p-0',
          },
          ring: 'ring-0',
        }"
      >
        <template
          class="border-0"
          #header
        >
          <img
            class="department-card__img"
            :src="staticUrl + item.preview?.path"
            alt=""
          />
        </template>
        <div class="department-card__title">{{ item.title }}</div>
      </UCard>
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.departments {
  @apply justify-between my-4 hidden lg:flex;
  &__item {
    @apply w-[19%] flex;
  }
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
