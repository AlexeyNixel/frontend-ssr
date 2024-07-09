<script setup lang="ts">
import { useBookStore } from '~/stores/bookStore';
import { Navigation } from 'swiper/modules';
import type { BookModel } from '~/models/book-model';
import Book from '~/components/ui/Book.vue';

interface Props {
  isVideo: boolean;
}

const props = defineProps<Props>();

const breakpoints = {
  1280: {
    slidesPerView: 6,
  },
  1024: {
    slidesPerView: 5,
  },
  768: {
    slidesPerView: 3,
  },
  540: {
    slidesPerView: 3,
  },
  429: {
    slidesPerView: 2,
  },
  364: {
    slidesPerView: 1.5,
  },
};

const bookStore = useBookStore();
const { isDesktop } = useDevice();
const books = ref<BookModel[]>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const { data } = await bookStore.getAll({
  pageSize: 15,
  orderBy: '-createdAt',
  include: 'preview',
  isVideo: props.isVideo ? true : undefined,
});

books.value = data;
</script>

<template>
  <div class="books" v-if="books">
    <Swiper
      :spaceBetween="5"
      :pagination="true"
      :modules="[Navigation]"
      :navigation="true"
      trigger="click"
      :breakpoints="breakpoints"
      class="slider books__slider"
    >
      <SwiperSlide v-for="item in books" :key="item.id" class="slider__item">
        <Book :book="item" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
.books {
  @apply bg-white dark:bg-neutral-900 rounded-[10px]  m-0;

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

:deep(.swiper-button-prev:after) {
  color: white;
}

:deep(.swiper-button-next:after) {
  color: white;
}
</style>
