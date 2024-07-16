<script lang="ts" setup>
import { useModal } from '#ui/composables/useModal';
import {
  BookCard,
  type BookResponseModel,
  useBookStore,
} from '~/entities/book';

const route = useRoute();
const bookStore = useBookStore();

const books = ref<BookResponseModel>();
const page = ref<number>(Number(route.query.page) || 1);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const modal = useModal();

onMounted(() => {
  fetchBook();
});

const handleNavigate = (val?: number) => {
  if (val) page.value = val;

  navigateTo({
    path: '/book',
    query: {
      page: val || page.value,
    },
  });

  fetchBook();
};

const fetchBook = async () => {
  books.value = await bookStore.getAll({
    pageSize: 15,
    include: 'preview',
    page: page.value,
  });
};
</script>

<template>
  <div v-if="books">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 items-center"
    >
      <book-card v-for="book in books.data" :key="book.id" :book="book" />
    </div>
    <UPagination
      class="flex justify-center my-4"
      v-model="page"
      :page-count="books.meta.pageSize"
      :total="Number(books.meta.total)"
      @update:model-value="handleNavigate()"
    />
  </div>
</template>
