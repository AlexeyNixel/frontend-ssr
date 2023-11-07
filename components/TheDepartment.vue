<script setup lang="ts">
import { useDepartmentStore } from '~/stores/departmentStore';
import { DepartmentType } from '~/models/baseTypes';
import { useGeneralStore } from '~/stores/generalStore';

const departmentStore = useDepartmentStore();

const departments = ref<DepartmentType[]>();

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

departments.value = await departmentStore.getDepartments({
  include: 'preview',
});
</script>

<template>
  <div class="flex justify-between">
    <nuxt-link
      :to="`/department/${item.slug}`"
      v-for="item in departments"
      :key="item.id"
      class="w-[19%] flex"
    >
      <UCard
        :ui="{
          header: {
            padding: 'p-0 sm:p-0',
          },
        }"
        class="shadow-none border-0 dark:bg-neutral-900 bg-white p-0"
      >
        <template class="border-0" #header>
          <img
            class="w-full object-cover"
            :src="staticUrl + item.preview?.path"
            alt=""
          />
        </template>
        <div>{{ item.title }}</div>
      </UCard>
    </nuxt-link>
  </div>
</template>

<style scoped lang="scss">

</style>
