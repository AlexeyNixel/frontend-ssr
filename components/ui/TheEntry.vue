<script setup lang="ts">
import { EntryType } from '~/models/baseTypes';
import dayjs from 'dayjs';

interface Props {
  entry: EntryType;
  isDate?: boolean;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="`/entry/${entry.slug}`"
    class="flex my-4 items-center text-black dark:text-white bg-white p-4 dark:bg-neutral-900 hover:bg-slate-300 dark:hover:bg-neutral-800 rounded-[10px] transition"
  >
    <div class="w-4/12 lg:w-[20%]">
      <img
        :onerror="
          (event: any) => {
            event.target.src =
              'https://cdn1.flamp.ru/b1aea1d7e4be8c57b1e414678d5756f0.png';
          }
        "
        class="image-placeholder f-full"
        v-if="entry.preview?.path"
        :src="entry.preview?.path"
      />
      <TheBase v-else class="w-full" />
    </div>
    <div class="ml-[10px] flex flex-col justify-between w-8/12 lg:w-[80%]">
      <div class="text-sm lg:font-bold lg:text-xl lg:mb-2">
        {{ entry.title }}
      </div>
      <div class="hidden lg:block" v-html="entry.desc"></div>
      <div class="hidden lg:block self-end">
        {{ dayjs(entry.publishedAt).format('DD.MM.YYYY') }}
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
// .image-placeholder {
//   background-image: url('../../public/favicon.ico');
//   background-repeat: no-repeat;
//   background-size: contain;
//   background-position: center;
//   color: transparent;
// }
</style>
