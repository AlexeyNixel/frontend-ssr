<script lang="ts" setup>
import type { Book } from '~/models/baseTypes';
import { useModal } from '#ui/composables/useModal';

interface Props {
  book?: Book;
}

const modal = useModal();
const props = defineProps<Props>();
console.log(props.book);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
</script>

<template>
  <UModal
    :ui="{
      width: 'sm:max-w-[50vw]',
    }"
    class="w-[30%] p-4"
    v-if="book"
  >
    <div class="flex self-end items-end">
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        @click="modal.close()"
      />
    </div>
    <div class="flex flex-col md:flex-row p-4">
      <div class="w-full md:w-1/3">
        <img class="" :src="staticUrl + book?.preview.path" alt="" />
      </div>
      <div class="md:w-2/3 ml-4">
        <!--          <div class="text-xl font-bold my-2">{{ book.title }}</div>-->
        <div class="font-bold my-2">{{ book.desc }}</div>
        <div class="my-2 text-justify" v-html="book?.content"></div>
      </div>
    </div>
  </UModal>
</template>
