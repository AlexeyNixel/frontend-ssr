<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import TheEntry from '~/components/ui/TheEntry.vue';
import { EntryType } from '~/models/baseTypes';
import { navigateTo } from '#app';
import { storeToRefs } from 'pinia';

const departmentRu: { [key: string]: string } = {
  ool: 'Отдел отраслевой литературы',
  mediateka: 'Медиатека',
  olp: 'Отдел литературных программ',
  kohl: 'Отдел художественной литературы',
  tspkim: 'Центр поддержки культурных инициатив молодежи',
};

const route = useRoute();
const router = useRouter();
const slug = ref<string>(route.params.slug as string);
const entryStore = useEntryStore();
const page = ref<number>(Number(route.query.page) || 1);
const { metaEntry } = storeToRefs(entryStore);
const { entries } = storeToRefs(entryStore);

const swapPage = () => {
  navigateTo({
    path: `/department/${slug.value}`,
    query: { page: page.value },
  });

  fetchData();
};

const fetchData = async () => {
  await entryStore.getEntriesByDepartment(slug.value, {
    orderBy: '-publishedAt',
    include: 'preview',
    page: page.value || 1,
  });
  if (process.client) window.scroll(0, 0);
};

fetchData();
</script>

<template>
  <Head>
    <Title>
      {{ departmentRu[route.params.slug as string] }}
    </Title>
  </Head>
  <div class="title">{{ departmentRu[route.params.slug as string] }}</div>
  <div>
    <TheEntry v-for="item in entries" :key="item.id" :entry="item" />
  </div>
  <UPagination
    class="my-4 flex items-center justify-center"
    v-model="page"
    :page-count="10"
    :total="Number(metaEntry.pages) * 10"
    @update:model-value="swapPage()"
  />
</template>

<style scoped lang="scss">
.title {
  margin: 20px 10px;
  font-size: 1.3rem;
  font-weight: bold;
}

.pagination {
  margin: 1vh 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
