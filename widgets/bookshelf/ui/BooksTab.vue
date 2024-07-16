<script setup lang="ts">
import { Navigation } from 'swiper/modules';
import {
  BookCard,
  type BookResponseModel,
  useBookStore,
} from '~/entities/book';

interface Props {
  isVideo: boolean;
}

const props = defineProps<Props>();
const bookStore = useBookStore();
const books = ref<BookResponseModel>();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

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

onMounted(() => {
  fetchBook();
});

const fetchBook = async () => {
  books.value = await bookStore.getAll({
    pageSize: 15,
    orderBy: '-createdAt',
    include: 'preview',
    isVideo: props.isVideo ? true : undefined,
  });
};
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
      <SwiperSlide
        v-for="item in books.data"
        :key="item.id"
        class="slider__item"
      >
        <BookCard :book="item" />
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
