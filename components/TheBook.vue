<script lang="ts" setup>
import type { Book } from '~/models/baseTypes';
import { useBookStore } from '~/stores/bookStore';
import { Navigation } from 'swiper/modules';
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';
import { ModalsBook } from '#components';
import { useModal } from '#ui/composables/useModal';

const generalStore = useGeneralStore();
const bookStore = useBookStore();

const books = ref<Book[]>();
const { screenWidth } = storeToRefs(generalStore);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const { isDesktop } = useDevice();
const pageSize = ref<number>(screenWidth?.value! / 250 || 5);

const modal = useModal();

const { data } = await bookStore.getAll({
  pageSize: 15,
  orderBy: '-createdAt',
  include: 'preview',
});

books.value = await data?.sort((a: any) =>
  a.oldId < Math.random() * 20 ? -1 : 1
);

const openModal = (book: Book) => {
  modal.open(ModalsBook, { book: book });
};

watch(screenWidth, () => {
  if (!screenWidth.value) return;
  if (screenWidth.value > 1280) pageSize.value = 6;
  else pageSize.value = screenWidth.value / 250;
});
</script>

<template>
  <div class="my-2 bg-white dark:bg-neutral-900 p-4 rounded-xl">
    <div class="flex items-center justify-between">
      <div class="text-xl font-bold">Книги</div>
      <nuxt-link
        to="/book"
        class="mx-4 text-blue-400 dark:text-blue-400 hover:text-blue-500 hover:dark:text-blue-500 hover:underline"
      >
        Полный каталог книг
      </nuxt-link>
    </div>
    <client-only>
      <Swiper
        :slidesPerView="isDesktop ? pageSize : 2"
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
          @click="openModal(item)"
        >
          <div class="text-center flex flex-col items-center">
            <img
              :src="staticUrl + item.preview?.path"
              class="justify-between items-center w-max h-[250px] cursor-pointer"
              alt=""
            />
            <div>
              {{ item.title }}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
:deep(.swiper-button-prev:after) {
  color: white;
}

:deep(.swiper-button-next:after) {
  color: white;
}
</style>
