<script setup lang='ts'>
import { useFileStore } from '~/stores/fileStore';
import { useRoute } from 'vue-router';
import { navigateTo } from '#app';
import { useGeneralStore } from '~/stores/generalStore';
import TheExhibitionsItem from '~/components/modals/TheExhibitionsItem.vue';

const route = useRoute();
const fileStore = useFileStore();
const exhibitions = ref<any>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const page = ref<number>(Number(route.query.page) || 1);
const totalPage = ref<number>(1);

const generalStore = useGeneralStore()
const currentPath = ref<string>('');

const handleChangeExhibition = (path: string) => {
  navigateTo({path:'http://static.infomania.ru'+ path})
};

const fetchData = async (val?: number) => {
  if (val) {
    page.value = val;
    navigateTo({path:'/exhibitions', query:{page:page.value} })
  }

  const { data, meta } = await fileStore.getFiles({
    searchByField: 'type=EXHIBITION',
    orderBy: '-createdAt',
    pageSize: 9,
    page: page.value,
  });
  totalPage.value = meta.pages;
  exhibitions.value = data;
};

fetchData();
</script>

<template>
  <div class='title'>Викторины и выставки</div>
  <div class='container'>
    <a
      :href='`http://static.infomania.ru${item.path}`'
      class='exhibition'
      v-for='item in exhibitions'
      :key='item.id'
      target='_blank'
    >
      <img
        class='exhibition__img'
        :src='staticUrl + item.preview'
        alt=''
        @click='handleChangeExhibition(item.path)'
      />
    </a>
  </div>

  <the-exhibitions-item :path='currentPath'/>
  <el-pagination
    :current-page='page'
    background
    class='pagination'
    layout='prev, pager, next'
    :page-count='totalPage'
    :pager-count='9'
    @currentChange='fetchData' />
</template>

<style scoped lang='scss'>
.title {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 1vh 0;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.5fr 0.5fr 0.5fr;
  gap: 5px;
  grid-auto-flow: row;
  grid-template-areas:
    '. . .'
    '. . .'
    '. . .';
}

.exhibition {
  &__img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1vh 0;
}
</style>
