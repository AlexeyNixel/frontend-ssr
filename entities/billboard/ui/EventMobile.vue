<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AffichePlaces } from '~/constants/billboardPlaces';
import { useBillboardStore } from '~/entities/billboard';

const billboardStore = useBillboardStore();
const { billboard } = storeToRefs(billboardStore);
const placeName = AffichePlaces;

const closeWindow = () => {
  billboard.value = [];
};
</script>

<template>
  <Swiper
    :modules="[SwiperPagination]"
    :pagination="true"
    v-if="billboard.length > 0"
    class="slider"
  >
    <SwiperSlide v-for="item in billboard" :key="item.id">
      <div class="event">
        <div class="header">
          <div class="header__title">{{ item.title }}</div>
          <UButton
            variant="link"
            @click="closeWindow"
            color="black"
            class="header__close"
          >
            <Icon class="text-3xl" name="pajamas:close" />
          </UButton>
        </div>
        <div class="body">
          <div class="description" v-html="item.desc" />
          <div class="info">
            <div class="text-sm">{{ placeName[item.eventPlace] }}</div>
            <div class="text-sm">{{ item.phone }}</div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped lang="scss">
.slider {
  @apply h-[318px] overflow-y-scroll;

  .event {
    @apply px-2;
    .header {
      @apply sticky top-0 bg-neutral-200 dark:bg-black flex items-center py-2;

      &__title {
        @apply font-bold;
      }
      &__close {
        @apply w-[40px] h-[40px] ml-2;
      }
    }

    .body {
      .description {
        @apply my-2;
      }
    }
  }
}
</style>
