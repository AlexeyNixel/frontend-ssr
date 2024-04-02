<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';
import dayjs from 'dayjs';

const NEWS_MENU_RUBRICS: { [key: string]: string } = {
  aktualnoe: 'Актуальное',
  anonsy: 'Анонсы',
  sobytiya: 'События',
};

const entryStore = useEntryStore();
const news = ref<{ [key: string]: EntryType[] }>({});
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const isLoading = ref<boolean>(false);

const ui = {
  base: 'animate-pulse',
  background: 'bg-gray-300 dark:bg-gray-800',
};

for (let rubric of Object.keys(NEWS_MENU_RUBRICS)) {
  news.value[rubric] = await entryStore.getEntriesByRubric(rubric, {
    pageSize: 6,
    include: 'rubrics,preview',
    orderBy: '-publishedAt',
    toDate: dayjs(new Date()).format('YYYY-MM-DD') + 'T00:00:00.000Z',
  });
}

watch(news, () => {
  isLoading.value = news.value.length > 0;
});
</script>

<template>
  <div
    v-if="isLoading"
    class="flex justify-between my-4"
  >
    <USkeleton
      v-for="item in 3"
      :key="item"
      :ui="ui"
      class="h-[952px] lg:w-[32.8%]"
    />
  </div>
  <div
    class="flex flex-col lg:flex-row justify-between"
    v-else
  >
    <div
      class="lg:w-[32.8%] bg-white dark:bg-neutral-900 p-4 rounded-[10px]"
      v-for="(item, index) in news"
      :key="index"
    >
      <NuxtLink
        :to="`/entry/rubric/${index}`"
        class="mx-3 text-xl font-bold hover:underline"
      >
        {{ NEWS_MENU_RUBRICS[index] }}
      </NuxtLink>
      <NuxtLink
        :to="`/entry/${entry.id}`"
        class="flex my-4 items-center lg:h-[130px] hover:bg-slate-300 dark:hover:bg-neutral-800 transition rounded-[10px] p-3"
        v-for="entry in item"
        :key="entry.id"
      >
        <div class="w-[40%] lg:h-[77px] xl:h-[101px]">
          <img
            :src="entry.preview?.path"
            class="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div class="w-[65%] ml-3 text-black dark:text-white">
          {{
            entry.title.length > 75
              ? entry.title.slice(0, 75).trim() + '...'
              : entry.title.trim()
          }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
