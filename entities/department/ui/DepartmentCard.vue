<script setup lang="ts">
import { type DepartmentType } from '~/entities/department';

const props = defineProps<{
  department: DepartmentType;
}>();

const ui = {
  header: {
    padding: 'p-0 sm:p-0',
  },
  ring: 'ring-0',
};
</script>

<template>
  <nuxt-link
    class="departments__link"
    :to="{ path: '/entry/search', query: { department: department.slug } }"
  >
    <UCard class="department-card" :ui="ui">
      <template class="border-0" #header>
        <img
          class="department-card__img"
          :src="department?.preview?.path"
          alt=""
        />
      </template>
      <div class="department-card__title">{{ department.title }}</div>
    </UCard>
  </nuxt-link>
</template>

<style scoped lang="scss">
.departments__link {
  @apply w-[19%] flex;
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
