<script lang="ts" setup>
import { useModal } from '#ui/composables/useModal';
import type { BookModel } from '~/entities/book';

interface Props {
  book?: BookModel;
}
const ui = {
  width: 'w-max sm:max-w-[50vw]',
};
const modal = useModal();
const props = defineProps<Props>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
</script>

<template>
  <UModal :ui="ui" class="modal" v-if="book">
    <div class="book-detail">
      <div class="header">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          @click="modal.close()"
        />
      </div>
      <div class="body">
        <img class="preview" :src="staticUrl + book?.preview.path" alt="" />
        <div class="content">
          <div class="content__description">{{ book.desc }}</div>
          <div class="content__text" v-html="book?.content"></div>
        </div>
      </div>
    </div>
  </UModal>
</template>

<style lang="scss" scoped>
.modal {
  @apply w-full p-4;

  .book-detail {
    @apply w-[900px];
    .header {
      @apply flex self-end items-end;
    }
    .body {
      @apply flex flex-col md:flex-row p-4;

      .preview {
        @apply w-full md:w-1/2 h-max;
      }
      .content {
        @apply md:w-2/3 ml-4;

        &__desctiption {
          @apply font-bold mb-2;
        }

        &__text {
          @apply my-2 text-justify;
        }
      }
    }
  }
}
</style>
