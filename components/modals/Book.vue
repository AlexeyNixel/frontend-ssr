<script lang="ts" setup>
import type { Book } from '~/models/baseTypes';
import { useModal } from '#ui/composables/useModal';

interface Props {
  book?: Book;
}

const modal = useModal();
const props = defineProps<Props>();

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
</script>

<template>
  <UModal
    :ui="{
      width: 'sm:max-w-[50vw]',
      background: 'bg-white dark:bg-neutral-900',
    }"
    class="w-[30%] p-4 dark:bg-white"
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
      <div class="flex flex-col justify-center w-1/4">
        <div class="w-full">
          <img
            class="w-full"
            :src="staticUrl + book?.preview.path"
            alt=""
          />
        </div>
        <div class="dark:bg-neutral-800 my-2 p-2 rounded-[10px]">
          Боевие, Фентези
        </div>
        <div class="dark:bg-neutral-800 my-2 p-2 rounded-[10px]">
          Отдел художественной литературы
        </div>
        <div class="dark:bg-neutral-800 my-2 p-2 rounded-[10px]">
          Дата поступления: 20.11.2023
        </div>
      </div>
      <div class="md:w-3/4 ml-4">
        <!--          <div class="text-xl font-bold my-2">{{ book.title }}</div>-->
        <h1 class="font-bold text-lg">{{ book.desc }}</h1>
        <div class="my-2 text-justify">{{ book.content }}</div>
      </div>
    </div>
  </UModal>
</template>
