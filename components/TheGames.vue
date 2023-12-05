<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '~/stores/gameStore';

const ui = {
  header: {
    padding: 'p-0 sm:p-0',
  },
  rounded: 'rounded-[10px]',
  shadow: 'shadow-none',
  body: {
    base: '',
    background: 'dark:bg-neutral-900',
    padding: 'px-0 py-0 sm:p-3 ',
  },
};

const staticUrl = ref(import.meta.env['VITE_GAME_STATIC_URL']);
const gameStore = useGameStore();
const { games } = storeToRefs(gameStore);

await gameStore.getGamesRandom();
</script>

<template>
  <Swiper
    :slidesPerView="5"
    :spaceBetween="12"
    :pagination="true"
    :modules="[SwiperPagination]"
    class="my-4"
    trigger="click"
  >
    <SwiperSlide
      class="flex justify-between rounded-[10px] w-full my-[2px]"
      v-for="game in games"
      :key="game.id"
    >
      <nuxt-link :to="`/game/${game.id}`">
        <UCard :ui="ui" class="rounded-[10px]">
          <template #header>
            <div class="flex justify-center h-64 bg-white">
              <img class="h-full" :src="staticUrl + game.cover_file" alt="" />
            </div>
          </template>

          <div class="h-16 p-0" v-html="game.name"></div>
        </UCard>
      </nuxt-link>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped lang="scss"></style>
