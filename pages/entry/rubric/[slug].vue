<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useEntryStore } from '~/stores/entryStore';
import { RubricType } from '~/models/baseTypes';
import { useRubricStore } from '~/stores/rubricStore';
import TheEntry from '~/components/ui/TheEntry.vue';
import { EntryResponseType } from 'models/entry-model';

const ruMenu: { [key: string]: string } = {
  anonsy: 'Анонсы',
  aktualnoe: 'Актуальное',
  sobytiya: 'События',
};

const route = useRoute();
const entryStore = useEntryStore();
const rubricStore = useRubricStore();

const rubric = ref<RubricType>();
const entries = ref<EntryResponseType>();

const page = ref<number>(Number(route.query.page) || 1);
const slug = ref<string>(route.params.slug as string);

const swapPage = () => {
  navigateTo({
    path: `/entry/rubric/${slug.value}`,
    query: { page: page.value },
  });
  fetchData();
};

const fetchData = async () => {
  if (process.client) window.scroll(0, 0);
  entries.value = await entryStore.getEntries({
    orderBy: '-publishedAt',
    include: 'preview',
    page: page.value,
    rubric: slug.value,
  });
};

rubric.value = await rubricStore.getRubric(slug.value);

fetchData();
</script>

<template>
  <div v-if="entries">
    <div class="text-2xl font-bold">{{ ruMenu[slug] }}</div>
    <div v-if="rubric?.desc" v-html="rubric.desc"></div>
    <TheEntry
      :entry="item"
      v-for="item in entries.data"
      :key="item.id"
    ></TheEntry>
    <UPagination
      class="flex justify-center my-4"
      v-model="page"
      :total="entries.meta.total"
      @update:model-value="swapPage()"
    />
  </div>
</template>

<style lang="scss" scoped></style>
