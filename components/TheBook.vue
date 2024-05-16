<script lang="ts" setup>
import type { Book } from '~/models/baseTypes';
import { useBookStore } from '~/stores/bookStore';
import { Navigation } from 'swiper/modules';
import { ModalsBook } from '#components';
import { useModal } from '#ui/composables/useModal';

const breakpoints = {
  1280: {
    slidesPerView: 5,
  },
  1024: {
    slidesPerView: 5,
  },
  768: {
    slidesPerView: 3,
  },
  640: {
    slidesPerView: 2,
  },
};
const modal = useModal();
const bookStore = useBookStore();
const { isDesktop } = useDevice();
const book = ref<Book[]>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const { data } = await bookStore.getAll({
  pageSize: 15,
  orderBy: '-createdAt',
  include: 'preview',
});

book.value = data;

// book.value = await data?.sort((a: any) =>
//   a.oldId < Math.random() * 20 ? -1 : 1
// );

const openModal = (book: Book) => {
  modal.open(ModalsBook, { book: book });
};
</script>

<template>
  <div
    class="books"
    v-if="book"
  >
    <section class="books__header">
      <h2 class="title">Книги</h2>
      <nuxt-link
        to="/book"
        class="link"
      >
        Полный список книг
      </nuxt-link>
    </section>
    <Swiper
      :spaceBetween="5"
      :pagination="true"
      :modules="[Navigation]"
      :navigation="true"
      trigger="click"
      :breakpoints="breakpoints"
      class="slider books__slider"
    >
      <SwiperSlide
        v-for="item in book"
        :key="item.id"
        @click="openModal(item)"
        class="slider__item"
      >
        <div class="book">
          <img
            :src="staticUrl + item.preview?.path"
            class="book__img"
            alt=""
          />
          <div class="book__title">
            {{ item.title }}
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
.books {
  @apply bg-white dark:bg-neutral-900 rounded-[10px] p-4 my-4;

  .books__header {
    @apply flex justify-between items-center mb-4;

    .title {
      @apply text-xl font-bold;
    }

    .link {
      @apply cursor-pointer hover:underline;
    }
  }
}

.book {
  @apply text-center flex flex-col items-center;

  &__img {
    @apply justify-between items-center w-max h-[250px] cursor-pointer;
  }
}

:deep(.swiper-button-prev:after) {
  color: white;
}

:deep(.swiper-button-next:after) {
  color: white;
}
</style>
