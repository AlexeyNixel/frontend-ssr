<script setup lang='ts'>
import { useEntryStore } from '~/stores/entryStore';
import TheEntry from '~/components/ui/TheEntry.vue';
import { EntryType } from '~/models/baseTypes';
import { navigateTo } from '#app';

const departmentRu = {
  'ool':'Отдел отраслевой литературы',
  'mediateka':'Медиатека',
  'olp':'Отдел литературных программ',
  'kohl':'Отдел художественной литературы',
  'tspkim':'Центр поддержки культурных инициатив молодежи',
}

const route = useRoute();
const router = useRouter();
const slug = ref<string>(route.params.slug as string);
const entryStore = useEntryStore();
const page = ref<number>(Number(route.query.page) || 1);
const entries = ref<EntryType[]>()
const totalPage = ref<number>(1);

const fetchData = async (val?: number) => {
  if (val) {
    navigateTo({ path: `/department/${slug.value}`, query: {  page: val } });
    page.value = val;
  }

  const { data, meta } = await entryStore.getEntriesByDepartment(slug.value, {
    orderBy: '-publishedAt',
    include: 'preview',
    page:page.value || 1
  });

  window.scroll(0, 0)
  totalPage.value = meta.pages
  entries.value = data
};

fetchData()

</script>

<template>
  <Head>
    <Title>
      {{departmentRu[route.params.slug as string]}}
    </Title>
  </Head>
  <div class='title'>{{departmentRu[route.params.slug as string]}}</div>
  <div>
    <TheEntry v-for='item in entries' :key='item.id' :entry='item' />
  </div>
  <div class='pagination'>
    <el-pagination
      background
      layout='prev, pager, next'
      :page-count='totalPage'
      @currentChange='fetchData'
      :current-page='page'
    />
  </div>
</template>

<style scoped lang='scss'>
.title {
  margin: 20px 10px ;
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