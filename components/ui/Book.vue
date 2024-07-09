<script setup lang="ts">
import type { BookModel } from '~/models/book-model';
import { ModalsBook } from '#components';
import { useModal } from '#ui/composables/useModal';

interface Props {
  book: BookModel;
}

const modal = useModal();

const props = defineProps<Props>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const openModal = () => {
  modal.open(ModalsBook, { book: props.book });
};
</script>

<template>
  <div class="book" @click="openModal">
    <img :src="staticUrl + book.preview?.path" class="book__img" alt="" />
    <div class="book__title">
      {{ book.title }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.book {
  @apply text-center flex flex-col items-center;

  &__img {
    @apply justify-between items-center w-max h-[250px] cursor-pointer;
  }
}
</style>
