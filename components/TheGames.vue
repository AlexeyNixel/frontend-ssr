<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '~/stores/gameStore';

const { isDesktop } = useDevice();
const ui = {
  header: {
    padding: 'p-0 sm:p-0',
  },
  rounded: 'rounded-[10px]',
  shadow: 'shadow-none',
  ring: 'ring-0',
  body: {
    base: '',
    background: 'dark:bg-neutral-900',
    padding: 'px-0 py-0 sm:p-3 ',
  },
};

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
      <nuxt-link
        to="/game"
        class="link"
        >Полный каталог игр</nuxt-link
      >
    </div>
    <Swiper
      :spaceBetween="5"
      :pagination="true"
      :modules="[SwiperPagination]"
      trigger="click"
      :breakpoints="breakpoints"
      class="slider games__slider"
    >
      <SwiperSlide
        v-for="game in games"
        :key="game.id"
        class="slider__item"
      >
        <UCard
          :ui="ui"
          class="game-card"
        >
          <template #header>
            <div class="game-card__header">
              <img
                v-if="game.cover_file"
                class="h-full"
                :src="staticUrl + game.cover_file"
                alt=""
              />
              <img
                v-else
                src="/chess-placeholder.png"
                alt=""
              />
            </div>
          </template>
          <div
            class="game-card__title"
            v-html="game.name"
          />
        </UCard>
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
