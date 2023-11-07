<script setup lang="ts">
import { useFileStore } from '~/stores/fileStore';
import { useRoute } from 'vue-router';
import { navigateTo } from '#app';
import { storeToRefs } from 'pinia';
import TheExhibitionsItem from '~/components/modals/TheExhibitionsItem.vue';

const route = useRoute();
const fileStore = useFileStore();
const page = ref<number>(Number(route.query.page) || 1);

const currentPath = ref<string>('');
const { metaFile } = storeToRefs(fileStore);
const { files } = storeToRefs(fileStore);

const handleChangeExhibition = (path: string) => {
  navigateTo({ path: 'http://static.infomania.ru' + path });
};

const swapPage = async () => {
  navigateTo({ path: '/exhibitions', query: { page: page.value } });
  if (process.client) window.scrollTo(0, 0);
  await fileStore.getFiles({
    searchByField: 'type=EXHIBITION',
    orderBy: '-createdAt',
    pageSize: 9,
    page: page.value,
  });
};

await fileStore.getFiles({
  searchByField: 'type=EXHIBITION',
  orderBy: '-createdAt',
  pageSize: 9,
  page: page.value,
});
</script>

<template>
  <div class="text-2xl my-2 font-bold">Викторины и выставки</div>
  <div class="grid grid-cols-3 gap-2">
    <a
      :href="`http://static.infomania.ru${item.path}`"
      class="exhibition"
      v-for="item in files"
      :key="item.id"
    >
      <img
        class="w-full h-full object-cover"
        :src="item.preview"
        alt=""
        @click="handleChangeExhibition(item.path)"
      />
    </a>
  </div>
  <the-exhibitions-item :path="currentPath" />
  <UPagination
    class="my-2 flex justify-center items-center"
    v-model="page"
    :total="metaFile.pages * 10"
    @update:model-value="swapPage()"
  />
</template>

<style scoped lang="scss">
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
  &__title {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 1vh 0;
  }

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
  margin: 2vh 0;
}
</style>
