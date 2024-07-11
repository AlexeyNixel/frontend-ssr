<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { GameCard, useGameStore } from '~/entities/game';

const { isDesktop } = useDevice();

const breakpoints = {
  1280: {
    slidesPerView: 5,
  },
  1024: {
    slidesPerView: 4,
  },
  768: {
    slidesPerView: 3,
  },
  640: {
    slidesPerView: 2,
  },
  364: {
    slidesPerView: 1.5,
  },
};

const staticUrl = ref(import.meta.env['VITE_GAME_STATIC_URL']);
const gameStore = useGameStore();
const { games } = storeToRefs(gameStore);

await gameStore.getGamesRandom();
</script>

<template>
  <div class="games">
    <div class="games__header">
      <div class="title">Игры</div>
      <nuxt-link to="/game" class="link">Полный каталог игр</nuxt-link>
    </div>
    <Swiper
      :spaceBetween="5"
      :pagination="true"
      :modules="[SwiperPagination]"
      trigger="click"
      :breakpoints="breakpoints"
      class="slider games__slider"
    >
      <SwiperSlide v-for="game in games" :key="game.id" class="slider__item">
        <game-card :game="game" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
.games {
  @apply my-4 bg-white dark:bg-neutral-900 rounded-[10px] p-4;

  &__header {
    @apply flex justify-between items-center mb-4;

    .title {
      @apply text-xl font-bold;
    }
  }

  .slider {
    &__item {
      @apply flex justify-between rounded-[10px] w-full;

      .game-card {
        @apply rounded-[10px];

        &__header {
          @apply flex justify-center h-64 bg-white;
        }

        &__title {
          @apply h-16 p-0 text-black dark:text-white;
        }
      }
    }
  }
}
</style>
