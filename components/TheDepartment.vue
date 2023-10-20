<script setup lang='ts'>
import { useDepartmentStore } from '~/stores/departmentStore';
import { DepartmentType } from '~/models/baseTypes';
import { useGeneralStore } from '~/stores/generalStore';

const departmentStore = useDepartmentStore()

const departments = ref<DepartmentType[]>()

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

departments.value = await departmentStore.getDepartments({
  include:'preview'
})
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
    height: 65%;
    display: inline-block;
    object-fit: cover;
  }

  &__title {
    display: flex;
    height: 35%;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-decoration: none;
  }
}

@media (min-width: 1921px) {
  .departments__item {
    height: 350px;
  }
}

@media (min-width: 1364px) and (max-width: 1920px) {
  .departments__item {
    height: 300px;
  }
}

@media (min-width: 980px) and (max-width: 1363px) {
  .departments__item {
    height: 200px;
  }
}

@media (max-width: 980px)  {
  .departments {
    display: none;
  }
}
</style>