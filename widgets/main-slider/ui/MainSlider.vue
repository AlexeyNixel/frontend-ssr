<script setup lang="ts">
import { useSliderStore } from '~/entities/slide';
import { storeToRefs } from 'pinia';
import { useGeneralStore } from '~/stores/generalStore';
import { BookVoteModal } from '~/widgets/book-vote-menu';

const ui = {
  base: 'animate-pulse',
  background: 'bg-gray-300 dark:bg-gray-800',
};

const generalStore = useGeneralStore();
const sliderStore = useSliderStore();

const { slides } = storeToRefs(sliderStore);
const isLoading = computed(() => slides.value.length > 0);
const staticUrl = ref(import.meta.env['VITE_STATIC_URL']);

const { open: modal } = useModal();
const openModal = () => {
  modal(BookVoteModal);
};

useAsyncData(async () => {
  await sliderStore.getSlides({
    include: 'image,entry',
    orderBy: '-createdAt',
    pageSize: 10,
  });
});
</script>

<template>
  <USkeleton :ui="ui" v-if="!isLoading" class="carousel skeleton" />
  <Swiper
    v-else
    :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
    :loop="true"
    pagination
    navigation
    :autoplay="{ delay: 6000, disableOnInteraction: true }"
    class="carousel"
  >
    <SwiperSlide class="carousel__item">
      <nuxt-link to="http://search.infomania.ru/jirbis2/" target="_blank">
        <img src="/banner_EC.png" alt="" />
      </nuxt-link>
    </SwiperSlide>
    <SwiperSlide @click="openModal" class="carousel__item">
      <img src="./bunner.png" alt="" />
    </SwiperSlide>
    <SwiperSlide class="carousel__item" v-for="item in slides" :key="item.id">
      <NuxtLink
        v-if="item.entry"
        :to="{ path: `/entry/${item.entry?.slug}`, external: true }"
        class="carousel__link"
      >
        <img
          :src="staticUrl + item.image.path"
          alt=""
          class="carousel__image"
        />
      </NuxtLink>
      <NuxtLink
        v-if="item?.url"
        :to="item.url"
        external
        target="_blank"
        class="carousel__link"
      >
        <img
          :src="staticUrl + item.image.path"
          alt=""
          class="carousel__image"
        />
      </NuxtLink>
      <div v-else class="carousel__link">
        <img
          :src="staticUrl + item.image.path"
          alt=""
          class="carousel__image"
        />
      </div>
      <client-only>
        <NuxtLink
          v-if="generalStore.token"
          :to="`http://admin.infomania.ru/slides/update/${item.id}`"
          external
          target="_blank"
          class="admin-link"
        >
          <Icon class="admin-link__icon" name="mdi:cog" />
        </NuxtLink>
      </client-only>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped lang="scss">
.carousel {
  @apply rounded-[10px] h-[30vw] sm:h-[200px] md:h-[240px] lg:h-[320px] xl:h-[400px] 2xl:h-[400px] w-full;

  &__item {
    @apply rounded-[10px] h-full;
  }

  &__image {
    @apply h-full w-full rounded-[10px];
  }
}

.admin-link {
  @apply absolute top-3 right-3;
  &__icon {
    @apply text-2xl hover:rotate-180 transition ease-in;
  }
}
</style>
