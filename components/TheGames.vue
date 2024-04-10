<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGameStore } from '~/stores/gameStore';
import { useGeneralStore } from '~/stores/generalStore';

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

const staticUrl = ref(import.meta.env['VITE_GAME_STATIC_URL']);
const gameStore = useGameStore();
const { games } = storeToRefs(gameStore);

const generalStore = useGeneralStore();
const { screenWidth } = storeToRefs(generalStore);
const pageSize = ref<number>(screenWidth?.value! / 250 || 5);

watch(screenWidth, () => {
  if (!screenWidth.value) return;
  if (screenWidth.value > 1280) pageSize.value = 5;
  else pageSize.value = screenWidth.value / 250;
});

await gameStore.getGamesRandom();
</script>

<template>
  <div class="my-4 bg-white dark:bg-neutral-900 rounded-[10px] p-2">
    <div class="flex justify-between items-center py-2 mx-1 rounded-[10px]">
      <div class="text-xl font-bold">Игры</div>
      <nuxt-link
        to="/game"
        class="mx-4 text-blue-400 dark:text-blue-400 hover:text-blue-500 hover:dark:text-blue-500 hover:underline"
      >
        Полный каталог игр
      </nuxt-link>
    </div>
    <Swiper
      :slidesPerView="pageSize"
      :spaceBetween="5"
      :pagination="true"
      :modules="[SwiperPagination]"
      class="mt-1"
      trigger="click"
    >
      <SwiperSlide
        class="flex justify-between rounded-[10px] w-full my-[2px]"
        v-for="game in games"
        :key="game.id"
      >
        <nuxt-link :to="`/game/${game.id}`">
          <UCard
            :ui="ui"
            class="rounded-[10px]"
          >
            <template #header>
              <div class="flex justify-center h-64 bg-white">
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
              class="h-16 p-0 text-black dark:text-white"
              v-html="game.name"
            ></div>
          </UCard>
        </nuxt-link>
      </SwiperSlide>
    </Swiper>
  </div>
</template>
