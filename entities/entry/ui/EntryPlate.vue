<script setup lang="ts">
import { type EntryType } from '~/entities/entry';
import TheBase from 'public/TheBase.vue';

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

interface Props {
  entry: EntryType;
  isDate?: boolean;
  size: 'full' | 'compact';
  date?: boolean;
}

defineProps<Props>();

const notFoundImage = (e: any) => {
  e.target.src = 'https://cdn1.flamp.ru/b1aea1d7e4be8c57b1e414678d5756f0.png';
};
</script>

<template>
  <div :class="`entry-plate entry-plate_${size}`" v-if="entry">
    <NuxtLink class="entry-plate__link" :to="`/entry/` + entry.slug">
      <div :class="`entry-plate__preview entry-plate__preview_${size}`">
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
        <div class="description" v-html="entry.desc" />
        <div class="date" v-if="date">
          {{ dayjs(entry.publishedAt).format('DD.MM.YYYY') }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.entry-plate {
  &_full {
    @apply my-4;
  }
  &__link {
    @apply flex items-center transition text-black rounded-[10px];
    @apply dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800;
    @apply hover:bg-slate-300 bg-white p-3;
  }
  &__preview {
    @apply w-4/12 lg:w-1/5 flex items-center;

    &_compact {
      @apply sm:h-[100px] sm:object-cover;
    }

    img {
      @apply rounded-[10px] w-full h-full object-cover;
    }
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
