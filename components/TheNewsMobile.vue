<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import { EntryType } from '~/models/baseTypes';
import TheEntryCard from '~/components/ui/TheEntryCard.vue';

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
  <div class="h-max">
    <Swiper
      v-for="(items, rubric) in news"
      :key="rubric"
      :slidesPerView="2"
      :spaceBetween="2"
      :pagination="true"
      :modules="[SwiperPagination]"
      class="h-full my-4"
      trigger="click"
    >
      <SwiperSlide
        class="flex rounded-[10px] w-full px-1"
        v-for="item in items"
        :key="item.id"
      >
        <UCard
          class="h-[310px] mb-2 shadow-none border-0 dark:bg-transparent bg-white p-0"
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
          <div class="h-full text-sm">
            {{
              item.title.length > 75
                ? item.title.slice(0, 75).trim() + '...'
                : item.title.trim()
            }}
          </div>
        </UCard>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss"></style>
