<script setup lang='ts'>
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';
import dayjs from 'dayjs';

const entryStore = useEntryStore();
const entries = ref<EntryType[]>();

const { data } = await entryStore.getEntriesByRubric('konkursy', {
  pageSize: 30,
  orderBy: '-publishedAt',
});
entries.value = data;

</script>

<template>
  <div class='entry-list'>
    <div class='entry-list__header'>Конкурсы</div>
    <NuxtLink :to='`/entry/${item.slug}`' class='entry-list__item' v-for='item in entries' :key='item.id'>
      <div class='entry-list__date'>{{ dayjs(item.publishedAt).format('DD.MM.YYYY') }}</div>
      <a class='entry-list__title'>{{ item.title }}</a>
    </NuxtLink>
  </div>
</template>

<style scoped lang='scss'>
.entry-list {
  &__header {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 1vh 0;
  }

  &__item {
    display: flex;
    margin: .5vh 0;
    text-decoration: none;
    color: var(--el-text-color);
    &:nth-child(odd) {
      color: var(--el-text-color-secondary);
    }
    &:hover {
      text-decoration: underline;
    }
  }

  &__date {
    font-family: Roboto;
    display: flex;
  }

  &__title {
    margin-left: 10px;
  }
}
</style>