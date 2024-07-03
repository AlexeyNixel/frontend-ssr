<script lang="ts" setup>
import { useBookStore } from '~/stores/bookStore';
import type { ImageType } from '~/models/baseTypes';
import { ModalsBook } from '#components';
import { useModal } from '#ui/composables/useModal';

interface Book {
  data: [
    {
      id: string;
      title: string;
      content: string;
      desc: string;
      fileId: string;
      isDeleted: boolean;
      preview: ImageType;
    },
  ];
  meta: {
    page: number;
    pageSize: number;
    total: number;
  };
}

const route = useRoute();
const bookStore = useBookStore();
const books = ref<Book>();
const page = ref<number>(Number(route.query.page) || 1);
const pages = ref<number>(1);
const isOpenBook = ref<boolean>(false);
const currentBook = ref<string>('');
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const modal = useModal();
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

const openModal = (book: Book) => {
  modal.open(ModalsBook, { book: book });
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
  <div v-if="books">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 items-center"
    >
      <div
        class="flex flex-col items-center justify-center h-max flex-wrap hover:scale-[1.06] transition"
        v-for="book in books.data"
        :key="book.id"
        @click="openModal(book)"
      >
        <img
          class="h-[300px] w-max"
          :src="staticUrl + book?.preview.path"
          alt=""
        />
        <div class="break-words text-center h-[100px]">{{ book.title }}</div>
      </div>
    </div>
    <UPagination
      class="flex justify-center my-4"
      v-model="page"
      :page-count="books.meta.pageSize"
      :total="Number(books.meta.total)"
      @update:model-value="handleNavigate()"
    />
  </div>
  <modals-book :current-book="currentBook" v-model="isOpenBook"></modals-book>
</template>
