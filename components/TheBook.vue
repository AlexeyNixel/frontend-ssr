<template>
  <div class="bg-white dark:bg-neutral-900 p-4 rounded-xl">
    <nuxt-link to="/book" class="text-xl font-bold text-black dark:text-white"
      >Книги</nuxt-link
    >
    <Swiper
      :slidesPerView="5"
      :spaceBetween="30"
      :pagination="true"
      :modules="[SwiperPagination]"
      trigger="click"
      class="my-4"
    >
      <SwiperSlide
        class="flex justify-between rounded-[10px] w-full"
        v-for="item in books"
        :key="item.id"
        @click="selectBook(item.id)"
      >
        <div>
          <img
            :src="staticUrl + item.preview?.path"
            class="justify-between items-center w-full h-[300px] cursor-pointer"
            alt=""
          />
          <div>
            {{ item.title }}
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
  <modals-book v-model="isOpenBook" :current-book="currentBook"></modals-book>
</template>

<script lang="ts" setup>
import { Book } from '~/models/baseTypes';
import { useBookStore } from '~/stores/bookStore';

const bookStore = useBookStore();
const books = ref<Book[]>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const isOpenBook = ref<boolean>(false);
const currentBook = ref<string>();

const selectBook = (book: string) => {
  isOpenBook.value = true;
  currentBook.value = book;
};

const { data } = await bookStore.getAll({
  pageSize: 10,
  orderBy: '-createdAt',
  include: 'preview',
});
books.value = data;
</script>
