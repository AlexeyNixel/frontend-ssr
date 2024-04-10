<script setup lang="ts">
import { useEntryStore } from '~/stores/entryStore';
import TheEntry from '~/components/ui/TheEntry.vue';
import { navigateTo } from '#app';
import { EntryResponseType } from '~/models/entry-model';

const departmentRu: { [key: string]: string } = {
  ool: 'Отдел отраслевой литературы',
  mediateka: 'Медиатека',
  olp: 'Отдел литературных программ',
  kohl: 'Отдел художественной литературы',
  tspkim: 'Центр поддержки культурных инициатив молодежи',
};

const route = useRoute();
const slug = ref<string>(route.params.slug as string);
const entryStore = useEntryStore();
const page = ref<number>(Number(route.query.page) || 1);
const entries = ref<EntryResponseType>();

const swapPage = () => {
  if (process.client) window.scroll(0, 0);

  fetchData();
  navigateTo({
    path: `/department/${slug.value}`,
    query: { page: page.value },
  });
};

const fetchData = async () => {
  entries.value = await entryStore.getEntries({
    orderBy: '-publishedAt',
    include: 'preview,department',
    page: page.value || 1,
    pageSize: 10,
    department: slug.value,
  });
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
  <div v-if="entries">
    <div>
      <TheEntry
        v-for="item in entries.data"
        :key="item.id"
        :entry="item"
      />
    </div>
    <UPagination
      class="my-4 flex items-center justify-center"
      v-model="page"
      :page-count="entries.meta.pageSize"
      :total="entries.meta.total"
      @update:model-value="swapPage()"
    />
  </div>
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
