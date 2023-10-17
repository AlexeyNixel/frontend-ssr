<script setup lang='ts'>
import { useFileStore } from '~/stores/fileStore';
import { useGeneralStore } from '~/stores/generalStore';
import TheExhibitionsItem from '~/components/modals/TheExhibitionsItem.vue';

const generalStore = useGeneralStore()
const fileStore = useFileStore();
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const slides = ref()
const currentPath = ref<string>('');

const handleChangeExhibition = (path: string) => {
  generalStore.isExhibition = !generalStore.isExhibition
  currentPath.value = path;
};

const { data } = await fileStore.getFiles({
  pageSize: 9,
  searchByField: 'type=EXHIBITION',
  orderBy: '-createdAt',
});
slides.value = data
</script>

<template>
  <Swiper
    :slidesPerView="3"
    :spaceBetween="30"
    :pagination="true"
    :modules='[SwiperPagination]'
    class='exhibition' trigger='click' height='400px'>
    <SwiperSlide class='exhibition__item' v-for='(slide, index) in slides' :key='index'>
        <img
          :src='staticUrl+slide.preview'
          class='exhibition__image'
          @click='handleChangeExhibition(slide.path)'
          alt=''
        >
    </SwiperSlide>
  </Swiper>
  <the-exhibitions-item :path='currentPath'/>
</template>

<style scoped lang='scss'>
.exhibition {
  margin: 1vh 0;
  height: 300px;

  &__item {
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    width: 100%;
  }

  &__image {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}


@media (min-width: 980px) and (max-width: 1363px) {
  .exhibition {
    margin: 1vh 0;
    height: 200px;
  }
}

@media (max-width: 980px)  {
  .exhibition {
    margin: 1vh 0;
    height: 200px;
  }
}
</style>