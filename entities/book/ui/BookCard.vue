<script setup lang="ts">
import { useModal } from '#ui/composables/useModal';
import { type BookModel } from '~/entities/book';
import BookModal from '~/entities/book/ui/BookModal.vue';

const props = defineProps<{
  book: BookModel;
}>();

const modal = useModal();

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const openModal = () => {
  modal.open(BookModal, { book: props.book });
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
