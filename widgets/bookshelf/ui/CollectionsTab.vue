<script setup lang="ts">
import {
  type CollectionModel,
  useCollectionStore,
} from '~/entities/collection';

const collectionStore = useCollectionStore();
const collections = ref<CollectionModel[]>([]);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const breakpoints = {
  1280: {
    slidesPerView: 4,
  },
  1024: {
    slidesPerView: 3.3,
  },
  768: {
    slidesPerView: 2.5,
  },
  540: {
    slidesPerView: 2,
  },
  429: {
    slidesPerView: 1.5,
  },
  364: {
    slidesPerView: 1.2,
  },
};

onMounted(() => {
  fetchCollections();
});

const fetchCollections = async () => {
  collections.value = await collectionStore.getCollections({
    include: 'preview',
  });
};
</script>

<template>
  <div class="collections">
    <Swiper
      v-if="collections.length > 0"
      :spaceBetween="5"
      trigger="click"
      :breakpoints="breakpoints"
      class="slider books__slider"
    >
      <SwiperSlide
        v-for="item in collections"
        :key="item.id"
        class="slider__item"
      >
        <NuxtLink :to="'/collection/' + item.id" class="collection">
          <img
            class="h-[200px] w-max collection__preview"
            :src="staticUrl + item.preview.path"
            alt=""
          />
          <div class="collection__name">{{ item.name }}</div>
          <div class="collection__description">{{ item.description }}</div>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>

    <div class="empty" v-else>
      Подборок пока что нет, но они обязательно появятся
    </div>
  </div>
</template>

<style scoped lang="scss">
.collections {
  @apply bg-white dark:bg-neutral-900 rounded-[10px] p-4;

  .collection {
    @apply w-full;

    &__preview {
      @apply w-full rounded-[10px];
    }

    &__name {
      @apply font-bold mb-2;
    }
    &__description {
      @apply hidden md:block;
    }
  }
}
</style>
