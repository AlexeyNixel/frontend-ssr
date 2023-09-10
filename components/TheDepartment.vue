<script setup lang='ts'>
import { useDepartmentStore } from '~/stores/departmentStore';
import { DepartmentType } from '~/models/baseTypes';

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const departmentStore = useDepartmentStore()
const departments = ref<DepartmentType[]>()

const {data} = await departmentStore.getDepartments({
  include:'preview'
})
departments.value = data
</script>

<template>
  <div class='departments'>
   <NuxtLink :to='`department/${item.slug}`' class='departments__item' v-for='item in departments' :key='item.title'>
     <img :src='staticUrl+item.preview.path' alt='' class='departments__img'>
     <div class='departments__title'>{{item.title}}</div>
   </NuxtLink>
  </div>
</template>

<style scoped lang='scss'>
.departments {
  display: flex;
  justify-content: space-between;
  margin: 1vh 0;
  &__item {
    width: calc(100% / 5 - 10px);
    background: var(--el-bg-color);
    border-radius: 10px;
    height: 300px;
    text-decoration: none;
    color: var(--el-text-color);
  }
  &__img {
    width: 100%;
    border-radius: 10px 10px 0 0 ;
    height: 250px;
    display: inline-block;
    object-fit: cover;
  }
  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;
  }
}
</style>