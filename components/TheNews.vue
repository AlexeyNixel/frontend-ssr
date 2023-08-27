<script setup lang='ts'>
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';
import { storeToRefs } from 'pinia';

const NEWS_MENU_RUBRICS = {
  'aktualnoe': 'Актуальное',
  'anonsy': 'Анонсы',
  'sobytiya': 'События',
};

const entryStore = useEntryStore();
const news = ref<{ [key: string]: EntryType[] }>({});
const { entries } = storeToRefs(entryStore);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

for (let rubric of Object.keys(NEWS_MENU_RUBRICS)) {
  await entryStore.getEntriesByRubric(rubric, {
    pageSize: 6,
    include: 'rubrics,preview',
    orderBy: '-publishedAt',
  });
  news.value[rubric] = entries.value?.data as EntryType[];
}

</script>

<template>
 <div class='news-menu'>
   <div class='news-menu__container' v-for='item in news' :key='item'>
     <NuxtLink class='news-menu__link' v-for='entry in item' :key='entry.id'>
       <img class='news-menu__img' :src='staticUrl+entry.preview.path' alt=''>
       <div class='news-menu__text'>{{entry.title}}</div>
     </NuxtLink>
   </div>
 </div>
</template>

<style scoped lang='scss'>

</style>