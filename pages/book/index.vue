<script lang="ts" setup>
import { useBookStore } from '~/stores/bookStore';
import { Book } from '~/models/baseTypes';

const route = useRoute();
const bookStore = useBookStore();
const books = ref<any>();
const page = ref<number>(Number(route.query.page) || 1);
const pages = ref<number>(1);
const isOpenBook = ref<boolean>(false)
const currentBook = ref<string>('')

const selectBook = (book: string) => {
  isOpenBook.value = true;
  currentBook.value = book;
};

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
  books.value = await bookStore.getAll({
    pageSize: 15,
    include: 'preview',
    page: page.value,
  });
};
handleFetchData();
</script>

<template>
  <div>
    <div class="grid grid-cols-5 gap-4 items-center">
      <div
        class="flex flex-col items-center justify-center h-max flex-wrap hover:scale-[1.1]"
        v-for="book in books?.data"
        :key="book.id"
        @click='selectBook(book.id)'
      >
        <img class="h-[300px] w-max" :src="book?.preview.path" alt="" />
        <div class="break-words">{{ book.title }}</div>
      </div>
    </div>
    <UPagination
      class="flex justify-center my-4"
      v-model="page"
      :total="books?.meta.total"
      :page-count='books?.meta.pageSize'
      @update:model-value="handleNavigate()"
    />
  </div>
  <modals-book :current-book='currentBook' v-model='isOpenBook' ></modals-book>
</template>
