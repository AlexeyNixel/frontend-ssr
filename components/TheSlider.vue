<script setup lang="ts">
import { useSliderStore } from '~/stores/sliderStore';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '~/stores/generalStore';

const generalStore = useGeneralStore();

const sliderStore = useSliderStore();
const { slides } = storeToRefs(sliderStore);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);
const loading = ref<boolean>(true);

await sliderStore.getSlides({ include: 'image,entry' });

loading.value = slides.value.length > 0;
</script>

<template>
  <el-skeleton :loading="!loading" animated>
    <template #template>
      <el-skeleton-item variant="image" class="slider" style="width: 100%" />
    </template>
    <template #default>
      <Swiper
        :modules="[SwiperAutoplay, SwiperPagination]"
        :loop="true"
        :pagination="true"
        :autoplay="{ delay: 6000, disableOnInteraction: true }"
        class="slider"
      >
        <SwiperSlide class="slider__item" v-for="item in slides" :key="item.id">
          <a class="slider__link" v-if="item.url" :href="item.url" target="_blank">
            <img class="slider__img" :src="staticUrl + item.image.path" alt="" />
          </a>
          <NuxtLink class="slider__link" v-else :to="`/entry/${item.entry.slug}`">
            <img class="slider__img" :src="staticUrl + item.image?.path" alt="" />
          </NuxtLink>
          <client-only>
            <NuxtLink
              :to="`http://admin.infomania.ru/slides/update/${item.id}`"
              class="slider__update"
              v-if="generalStore.token"
            >
              <font-awesome-icon v-if="generalStore.token" icon="fa-solid fa-gear" />
            </NuxtLink>
          </client-only>
        </SwiperSlide>
      </Swiper>
    </template>
  </el-skeleton>
</template>

<style scoped lang="scss">
.slider {
  margin: 1vh 0;
  border-radius: 10px;
  height: 600px;

  &__img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  &__update {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.4rem;
    color: red;
    margin: 0.5vw;
  }
}

@media (min-width: 1364px) and (max-width: 1921px) {
  .slider {
    height: 426px;
  }
}

@media (min-width: 980px) and (max-width: 1363px) {
  .slider {
    height: 306px;
  }
}

@media (max-width: 979px) {
  .slider {
    height: 31.4vw;
  }
}
</style>
