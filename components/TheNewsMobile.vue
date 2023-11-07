<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';

const NEWS_MENU_RUBRICS = {
  aktualnoe: 'Актуальное',
  anonsy: 'Анонсы',
  sobytiya: 'События',
};

const entryStore = useEntryStore();
const news = ref<{ [key: string]: EntryType[] }>({});

const rubricsTranslate: { [key: string]: string } = {
  aktualnoe: 'Актуальное',
  anonsy: 'Анонсы',
  sobytiya: 'События',
};

for (let rubric of Object.keys(NEWS_MENU_RUBRICS)) {
  news.value[rubric] = await entryStore.getEntriesByRubric(rubric, {
    pageSize: 6,
    include: 'rubrics,preview',
    orderBy: '-publishedAt',
  });
}
</script>

<template>
  <div>
    <div class="my-3" v-for="(items, rubric) in news" :key="rubric">
      <div class="flex overflow-x-scroll">
        <UCard
          class="w-52 mx-3 shrink-0 shadow-none border-0 dark:bg-neutral-900 bg-white p-0"
          v-for="item in items"
          :key="item.id"
          @click="
            navigateTo({
              path: `/entry/${item?.slug}`,
            })
          "
          :ui="{
            header: {
              padding: 'p-0 sm:p-0',
            },
          }"
        >
          <template class="border-0" #header>
            <img
              class="h-[156px] w-full object-cover"
              :src="item.preview?.path"
              alt=""
            />
          </template>
          <div>
            {{
              item.title.length > 50
                ? item.title.slice(0, 50).trim() + '...'
                : item.title.trim()
            }}
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
