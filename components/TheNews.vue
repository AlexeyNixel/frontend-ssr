<script setup lang='ts'>
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';

const NEWS_MENU_RUBRICS = {
  'aktualnoe': 'Актуальное',
  'anonsy': 'Анонсы',
  'sobytiya': 'События',
};

const entryStore = useEntryStore();
const news = ref<{ [key: string]: EntryType[] }>({});
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

for (let rubric of Object.keys(NEWS_MENU_RUBRICS)) {
  const { data } = await entryStore.getEntriesByRubric(rubric, {
    pageSize: 6,
    include: 'rubrics,preview',
    orderBy: '-publishedAt',
  });
  news.value[rubric] = data;
}
</script>

<template>
  <div class='news-menu'>
    <div class='news-menu__item' v-for='(menu, index) in news' :key='index'>
      <div class='news-menu__item-title-container'>
        <NuxtLink class='news-menu__item-title'>
          {{ NEWS_MENU_RUBRICS[index] }}
        </NuxtLink>
      </div>
      <div class='news-menu__item-container'>
        <NuxtLink
          class='news-menu__item-news'
          v-for='item in menu'
          :key='item.id'
          :to='`entry/${item.slug}`'
        >
          <div class='news-menu__item_news-preview'>
            <img v-if='item.preview' :src='`${staticUrl}${item.preview.path}`' alt=''>
          </div>
          <div class='news-menu__item_news-text'>
            {{ `${item.title.length > 80 ? item.title.slice(0, 80).trim() + '...' : item.title.trim()}` }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>

</template>

<style scoped lang='scss'>
.news-menu {
  display: flex;
  margin: 1vh 0;
  justify-content: space-between;
  flex-wrap: wrap;

  &__item {
    padding: 10px;
    background: var(--el-bg-color);
    border-radius: 10px;
    width: calc((100% / 3) - 30px);

    &-container {
      height: 97%;
    }

    &-news {
      text-decoration: none;
      color: var(--font-color);
      display: flex;
      align-items: center;
      padding: 5px 10px;
      height: calc(16.666% - 15px);
      border-radius: 10px;

      &:hover {
        box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%),
        0 2px 10px 0 rgb(0 0 0 / 12%);
        color: var(--font-hover-color);
        transition: .3s;
        background: var(--el-bg-color-overlay);
      }
    }

    &_news-preview {
      width: 30%;
      height: 100%;
    }

    &_news-preview img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &_news-text {
      width: 70%;
      margin-left: 10px;
    }
  }

  &__item-title-container {
    height: 3%;
    margin: 1vh 0;

  }

  &__item-title {
    font-size: 1.4rem;
    font-weight: bold;
    color: var(--title-color);
    padding: 10px;
    text-decoration: none;
  }

}
</style>