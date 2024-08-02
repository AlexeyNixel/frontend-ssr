<script setup lang="ts">
import { useCollectionStore } from '~/entities/collection';
import { BookCard } from '~/entities/book';

const collectionStore = useCollectionStore();

const route = useRoute();

const slug = ref(route.params.slug as string);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const books = ref<any>();
const collection = ref<any>();

books.value = await collectionStore.getBookByCollection(slug.value);
collection.value = await collectionStore.getCollection(slug.value);
</script>

<template>
  <div class="collection">
    <header class="header">
      <div class="header__name">{{ collection.name }}</div>
      <div class="header__description">{{ collection.description }}</div>
    </header>
    <div class="body">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.collection {
  .header {
    @apply my-2;
    &__name {
      @apply font-bold text-2xl;
    }
  }

  .body {
    @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5;
  }
}
</style>
