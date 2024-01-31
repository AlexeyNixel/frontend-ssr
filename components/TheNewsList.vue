<script lang="ts" setup>
import { EntryType } from 'models/baseTypes';
import { useEntryStore } from '~/stores/entryStore';
import TheEntryCard from '~/components/ui/TheEntryCard.vue';
import TheEntryCarousel from '~/components/ui/TheEntryCarousel.vue';

const entryStore = useEntryStore();
const entry = ref<EntryType[]>();
const entryPinned = ref<EntryType>();

entry.value = await entryStore.getEntriesByRubric('anonsy', {
  pageSize: 4,
  include: 'preview',
  orderBy: '-publishedAt',
});

entryPinned.value = await entryStore.getEntryPinned();
</script>

<template>
  <div class="flex">
    <div
      class="flex flex-col justify-between w-8/12 bg-white dark:bg-neutral-900 rounded-[10px] p-4"
    >
      <div class="">
        <div class="ml-1 mb-2">
          <nuxt-link
            class="text-xl font-bold text-black dark:text-white"
            to="/entry/rubric/anonsy"
          >
            Анонсы
          </nuxt-link>
        </div>
        <nuxt-link
          class="flex mb-2"
          v-if="entryPinned"
          :to="`/entry/${entryPinned.slug}`"
        >
          <img
            class="rounded-l-[10px] w-1/2"
            :src="entryPinned?.preview.path"
            alt=""
          />
          <div class="ml-4">
            <div
              class="font-bold xl:text-xl text-black dark:text-white"
              v-html="entryPinned.title"
            ></div>
            <div
              class="text-black dark:text-white"
              v-html="entryPinned.desc"
            ></div>
          </div>
        </nuxt-link>
      </div>
      <div class="rounded-[10px] grid grid-cols-4">
        <the-entry-card v-for="item in entry" :key="item.id" :entry="item" />
      </div>
    </div>
    <div class="ml-3 w-4/12 bg-white dark:bg-neutral-900 rounded-[10px] p-2">
      <div class="main">
        <TheEntryCarousel rubric="sobytiya" />
        <TheEntryCarousel rubric="aktualnoe" />
      </div>
    </div>
  </div>
</template>
