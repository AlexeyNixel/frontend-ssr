<script setup lang="ts">
import dayjs from 'dayjs';
import { type EntryType } from '~/entities/entry';
import TheBase from 'public/TheBase.vue';

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

interface Props {
  entry: EntryType;
  isDate?: boolean;
}

defineProps<Props>();

const notFoundImage = (e: any) => {
  e.target.src = 'https://cdn1.flamp.ru/b1aea1d7e4be8c57b1e414678d5756f0.png';
};
</script>

<template>
  <div class="entry-plate" v-if="entry">
    <NuxtLink class="entry-plate__link" :to="`/entry/` + entry.slug">
      <div class="entry-plate__preview">
        <img
          v-if="entry.preview?.path"
          class="image image-placeholder f-full"
          :onerror="notFoundImage"
          :src="staticUrl + entry.preview?.path"
          alt=""
        />
        <the-base v-else class="image w-full" />
      </div>
      <div class="entry-plate__main">
        <div class="title">{{ entry.title }}</div>
        <div class="description" v-html="entry.desc"></div>
        <div class="date">
          {{ dayjs(entry.publishedAt).format('DD.MM.YYYY') }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.entry-plate {
  &__link {
    @apply flex my-4 items-center transition text-black rounded-[10px];
    @apply dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800;
    @apply hover:bg-slate-300 bg-white p-4;
  }
  &__preview {
    @apply w-4/12 lg:w-1/5;
  }
  &__main {
    @apply flex flex-col w-8/12 lg:w-4/5 ml-4;
    .title {
      @apply text-sm lg:font-bold lg:text-xl lg:mb-2;
    }
    .description {
      @apply hidden lg:block;
    }
    .date {
      @apply self-end mt-4;
    }
  }
}
</style>
