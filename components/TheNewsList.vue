<script lang="ts" setup>
import dayjs from 'dayjs';
import { EntryType } from 'models/baseTypes';
import { useEntryStore } from '~/stores/entryStore';
import TheEntryCard from '~/components/ui/TheEntryCard.vue';
import TheEntryCarousel from '~/components/ui/TheEntryCarousel.vue';

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const entryStore = useEntryStore();
const entry = ref<EntryType[]>();

entry.value = await entryStore.getEntriesByRubric('anonsy', {
  pageSize: 4,
  include: 'preview',
  orderBy: '-createdAt',
});
</script>

<template>
  <div class="news">
    <div class="news__content">
      <div class="main-entry">
        <img
          :src="staticUrl + entry[0].preview.path"
          alt=""
          class="main-entry__preview"
        />
        <div class="main-entry__content">
          <div class="main-entry__title">{{ entry[0].title }}</div>
          <div class="main-entry__desc" v-html="entry[0].desc"></div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-3 mt-3">
        <TheEntryCard v-for="item in entry" :key="item.id" :entry="item" />
      </div>
    </div>
    <div class="news__content short">
      <TheEntryCarousel rubric="sobytiya" />
      <TheEntryCarousel rubric="aktualnoe" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news {
  @apply flex;
  &__content {
    @apply w-8/12 bg-white dark:bg-neutral-900 p-4 rounded-[10px];
  }
  .short {
    @apply w-4/12 ml-2;
  }
}
.main-entry {
  @apply flex;

  &__preview {
    @apply w-[45%] rounded-l-[10px];
  }

  &__content {
    @apply ml-2;
  }

  &__title {
    @apply text-2xl font-bold;
  }
}
</style>
