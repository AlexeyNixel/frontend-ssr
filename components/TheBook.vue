<script lang="ts" setup>
import { Book } from '~/models/baseTypes';
import { useBookStore } from '~/stores/bookStore';
import { Navigation } from 'swiper/modules';

const bookStore = useBookStore();
const books = ref<Book[]>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const isOpenBook = ref<boolean>(false);
const currentBook = ref<string>();
const { isDesktop } = useDevice();

const selectBook = (book: string) => {
  isOpenBook.value = true;
  currentBook.value = book;
};

const { data } = await bookStore.getAll({
  pageSize: 20,
  orderBy: '-createdAt',
  include: 'preview',
});
books.value = data;
</script>

<template>
  <div class="my-2 bg-white dark:bg-neutral-900 p-4 rounded-xl">
    <nuxt-link to="/book" class="text-xl font-bold text-black dark:text-white">
      Книги
    </nuxt-link>
    <Swiper
      :slidesPerView="isDesktop ? 6 : 2"
      :spaceBetween="5"
      :pagination="true"
      :modules="[Navigation]"
      :navigation="true"
      trigger="click"
      class="my-4"
    >
      <SwiperSlide
        class="flex justify-between rounded-[10px] w-full px-2"
        v-for="item in books"
        :key="item.id"
        @click="selectBook(item.id)"
      >
        <div class="text-center flex flex-col items-center">
          <img
            :src="staticUrl + item.preview?.path"
            class="justify-between items-center w-max h-[250px] cursor-pointer"
            alt=""
          />
          <!--          <div class='absolute'>asd</div>-->
          <div>
            {{ item.title }}
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
  <modals-book v-model="isOpenBook" :current-book="currentBook"></modals-book>
</template>

<style lang="scss" scoped>
:deep(.swiper-button-prev:after) {
  color: white;
}

:deep(.swiper-button-next:after) {
  color: white;
}
</style>
