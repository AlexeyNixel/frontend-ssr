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
    :slidesPerView="3"
    :spaceBetween="30"
    :pagination="true"
    :modules="[SwiperPagination]"
    class="my-4 sm:h-[144px] md:h-[190px] lg:h-[230px] xl:h-[300px]"
    trigger="click"
  >
    <SwiperSlide
      class="flex justify-between rounded-[10px] w-full"
      v-for="(slide, index) in exhibitions"
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

<style scoped lang="scss"></style>
