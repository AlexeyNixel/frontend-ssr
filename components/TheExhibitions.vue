<script setup lang="ts">
import { useFileStore } from '~/stores/fileStore';
import { useModal } from '#ui/composables/useModal';
import { ModalsTheExhibitionsItem } from '#components';

const modal = useModal();
const fileStore = useFileStore();

const exhibitions = ref();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const breakpoints = {
  1280: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 2,
  },
  640: {
    slidesPerView: 2,
  },
};

const handleOpenModal = (path: string) => {
  modal.open(ModalsTheExhibitionsItem, { path: path });
};

exhibitions.value = await fileStore.getFiles({
  pageSize: 9,
  searchByField: 'type=EXHIBITION',
  orderBy: '-createdAt',
});
</script>

<template>
  <div v-if="exhibitions">
    <Swiper
      class="exhibitions-slider"
      :spaceBetween="30"
      :pagination="true"
      :modules="[SwiperPagination]"
      trigger="click"
      :breakpoints="breakpoints"
    >
      <SwiperSlide
        class="exhibitions-slider__item"
        v-for="(slide, index) in exhibitions.data"
        :key="index"
      >
        <img
          class="preview"
          :src="staticUrl + slide.preview"
          @click="handleOpenModal(slide.path)"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
.exhibitions-slider {
  @apply my-4 sm:h-full md:h-full lg:h-[230px] xl:h-[300px] rounded-[10px];

  &__item {
    @apply flex justify-between rounded-[10px] w-full;

    .preview {
      @apply justify-between items-center w-full h-full cursor-pointer;
    }
  }
}
</style>
