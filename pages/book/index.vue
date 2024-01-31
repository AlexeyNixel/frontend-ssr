<script lang="ts" setup>
import { useBookStore } from '~/stores/bookStore';
import { Book } from '~/models/baseTypes';

const route = useRoute();
const bookStore = useBookStore();
const books = ref<Book[]>();
const page = ref<number>(Number(route.query.page) || 1);
const pages = ref<number>(1);

const handleNavigate = (val?: number) => {
  if (val) page.value = val;

  navigateTo({
    path: '/book',
    query: {
      page: val || page.value,
    },
  });

  handleFetchData();
};

const handleFetchData = async () => {
  const { data, meta } = await bookStore.getAll({
    include: 'preview',
    page: page.value,
  });
  pages.value = meta.pages;
  books.value = data;
};
handleFetchData();
</script>

<template>
  <div>
    <div class="grid grid-cols-5 gap-4 items-center">
      <div
        class="flex flex-col items-center justify-center h-max flex-wrap"
        v-for="book in books"
        :key="book.id"
      >
        <img class="h-[300px] w-max" :src="book?.preview.path" alt="" />
        <div class="break-words">{{ book.title }}</div>
      </div>
    </div>
    <UPagination
      class="flex justify-center my-4"
      v-model="page"
      :total="pages * 10"
      @update:model-value="handleNavigate()"
    />
  </div>
</template>
