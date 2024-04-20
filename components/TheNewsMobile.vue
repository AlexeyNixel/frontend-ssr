<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';
import EntryMobile from '~/components/ui/EntryMobile.vue';

const NEWS_MENU_RUBRICS = {
  aktualnoe: 'Актуальное',
  anonsy: 'Анонсы',
  sobytiya: 'События',
};

const generalStore = useGeneralStore();
const entryStore = useEntryStore();

const { screenWidth } = storeToRefs(generalStore);
const { anonsy, aktualnoe, sobytiya } = storeToRefs(entryStore);

const news = ref<{ [key: string]: any }>({});

const slidePerView = computed(() => {
  if (screenWidth.value) {
    if (screenWidth.value > 642) return 3;
    else return 2;
  }
});

// const rubricsTranslate: { [key: string]: string } = {
//   aktualnoe: 'Актуальное',
//   anonsy: 'Анонсы',
//   sobytiya: 'События',
// };

// for (let rubric of Object.keys(NEWS_MENU_RUBRICS)) {
//   const data = await entryStore.getEntries({
//     rubric: rubric,
//     pageSize: 6,
//     include: 'rubrics,preview',
//     orderBy: '-publishedAt',
//   });
//   news.value[rubric] = data.data;
// }
</script>

<template>
  <div class="h-max">
    <entry-mobile
      v-if="anonsy"
      :entries="anonsy"
    />
    <entry-mobile
      v-if="aktualnoe"
      :entries="aktualnoe"
    />
    <entry-mobile
      v-if="sobytiya"
      :entries="sobytiya"
    />
  </div>
</template>
