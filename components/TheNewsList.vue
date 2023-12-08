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
  <div class="flex">
    <div class="w-8/12 bg-white dark:bg-neutral-900 rounded-[10px] p-2">
      <NuxtLink class="flex">
        <img
          class="w-1/2 rounded-l-[10px]"
          :src="staticUrl + entry[0].preview.path"
          alt=""
        />
        <div class="ml-2">
          <div class="text-2xl" v-html="entry[0].title"></div>
          <div class="text" v-html="entry[0].desc"></div>
        </div>
      </NuxtLink>
    </div>
    <div class="ml-3 w-4/12 bg-white dark:bg-neutral-900 rounded-[10px] p-2">
      <TheEntryCarousel rubric="sobytiya" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news {
  @apply flex;
  &__content {
    @apply w-8/12 bg-white dark:bg-neutral-900  p-4 rounded-[10px];
  }
  .short {
    @apply w-4/12 ml-2;
  }
}
.main-entry {
  @apply flex items-center hover:bg-neutral-100 rounded-[10px] transition h-1/2;

  &__preview {
    @apply lg:h-[70%] xl:h-full rounded-l-[10px] w-1/2 object-cover;
  }

  &__content {
    @apply ml-2;
  }

  &__title {
    @apply xl:text-2xl font-bold;
  }
}
</style>
