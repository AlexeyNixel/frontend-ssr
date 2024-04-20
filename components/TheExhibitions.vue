<script setup lang="ts">
import { useFileStore } from '~/stores/fileStore';
import { useGeneralStore } from '~/stores/generalStore';
import TheExhibitionsItem from '~/components/modals/TheExhibitionsItem.vue';

const generalStore = useGeneralStore();
const fileStore = useFileStore();

const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const exhibitions = ref();
const currentPath = ref<string>('');

const handleChangeExhibition = (path: string) => {
  generalStore.isExhibition = !generalStore.isExhibition;
  currentPath.value = path;
};

exhibitions.value = await fileStore.getFiles({
  pageSize: 9,
  searchByField: 'type=EXHIBITION',
  orderBy: '-createdAt',
});
</script>

<template>
  <Swiper
    :spaceBetween="30"
    :pagination="true"
    :modules="[SwiperPagination]"
    class="my-4 sm:h-full md:h-full lg:h-[230px] xl:h-[300px] rounded-[10px]"
    trigger="click"
    :breakpoints="{
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
    }"
  >
    <SwiperSlide
      class="flex justify-between rounded-[10px] w-full"
      v-for="(slide, index) in exhibitions.data"
      :key="index"
    >
      <img
        :src="staticUrl + slide.preview"
        class="justify-between items-center w-full h-full cursor-pointer"
        @click="handleChangeExhibition(slide.path)"
        alt=""
      />
    </SwiperSlide>
  </Swiper>
  <the-exhibitions-item :path="currentPath" />
</template>
