<script setup lang="ts">
import { ReaderZoneTabsBooks, ReaderZoneTabsCollections } from '#components';

const tabs = {
  books: ReaderZoneTabsBooks,
  video: ReaderZoneTabsBooks,
  collections: ReaderZoneTabsCollections,
};

const ui = {
  list: {
    base: 'relative m-0',
    background: 'bg-gray-100 dark:bg-neutral-900 m-0',
    rounded: 'rounded-lg',
    shadow: '',
    padding: 'p-1',
    height: 'h-10',
    width: 'w-full',
    marker: {
      wrapper:
        'absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none',
      base: 'w-full h-full',
      background: 'bg-white dark:bg-neutral-800',
      rounded: 'rounded-md',
      shadow: 'shadow-sm',
    },
  },
};

const items = [
  {
    tag: 'books',
    label: 'Книги',
  },
  {
    tag: 'collections',
    label: 'Подборки',
  },
  {
    tag: 'video',
    label: 'Видео обзоры',
  },
];
</script>

<template>
  <div class="reader-zone">
    <section class="reader-zone__header">
      <div class="title">Книги</div>
      <nuxt-link to="/book" class="link"> Полный список книг </nuxt-link>
    </section>

    <UTabs :ui="ui" :items="items" class="m-0">
      <template class="" #item="{ item }">
        <div class="asd">
          <component
            class="m-0"
            :is="tabs[item.tag]"
            :isVideo="item.tag === 'video'"
          />
        </div>
      </template>
    </UTabs>
  </div>
</template>

<style scoped lang="scss">
.reader-zone {
  @apply p-4 bg-white dark:bg-neutral-900 rounded-[10px];
  &__header {
    @apply flex items-center justify-between mb-2;
  }
  .title {
    @apply text-xl font-bold;
  }
}
</style>
