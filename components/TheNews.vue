<script setup lang='ts'>

import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';
import { storeToRefs } from 'pinia';

const NEWS_MENU_RUBRICS = {
  'aktualnoe': 'Актуальное',
  'anonsy': 'Анонсы',
  'sobytiya': 'События'
}


const entryStore = useEntryStore()
const news = ref<{ [key: string]: EntryType[] }>({})
const { entries } = storeToRefs(entryStore)
const staticUrl = ref(import.meta.env['VITE_STATIC_URL'])

for (let rubric of Object.keys(NEWS_MENU_RUBRICS)) {
  await entryStore.getEntriesByRubric(rubric, {
    pageSize: 6,
    include: 'rubrics,preview',
    orderBy: '-publishedAt',
  })
  news.value[rubric] = entries.value?.data as EntryType[]
}
console.log(news.value);
</script>

<template>
  <div class='news-menu'>
    <div  class='news-menu__container' v-for='(item, name) in news'>
      <div class='news-menu__title'>{{NEWS_MENU_RUBRICS[name]}}</div>
      <NuxtLink :to='`entry/${entry.slug}`' class='news-menu__link' v-for='entry in item.data'>
        <div class='news-menu__preview'>
          <img class='news-menu__img' :src='staticUrl+entry.preview.path' alt=''>
        </div>
        <p class='news-menu__text'>{{ entry.title.length > 80? entry.title.slice(0, 80).trim() + '...' : entry.title.trim() }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.news-menu {
  display: flex;
  justify-content: space-between;
  margin: 1vh 0;

  &__container {
    background: var(--el-bg-color);
    padding: 20px;
    border-radius: 10px;
    width: calc(100% / 3 - 50px);
  }

  &__title {
    font-weight: bold;
    font-size: 1.4rem;
  }

  &__link {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-radius: 10px;
    height: calc(16.666% - 20px);
    &:hover {
      background: var(--el-bg-color-overlay);
      transition: .3s;
    }
  }

  &__preview {
    width: 30%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__text {
    width: 70%;
    padding: 0 10px;
  }
}
</style>