<script setup lang="ts">
import BooksTab from '~/widgets/bookshelf/ui/BooksTab.vue';
import CollectionsTab from '~/widgets/bookshelf/ui/CollectionsTab.vue';
import { bookshelfUi } from '~/widgets/bookshelf/ui/bookshelf.ui';

const tabs = {
  books: BooksTab,
  video: BooksTab,
  collections: CollectionsTab,
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

    <UTabs :ui="bookshelfUi" :items="items" class="m-0">
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
