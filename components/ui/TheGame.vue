<script setup lang="ts">
import { GameType } from 'models/baseTypes';

interface Props {
  game: GameType;
}

const staticUrl = ref(import.meta.env['VITE_GAME_STATIC_URL']);
const ui = {
  header: {
    padding: 'p-0 sm:p-0',
  },
  rounded: 'rounded-[10px]',
  shadow: 'shadow-none',
  ring: 'ring-0 ring-white',
  body: {
    base: '',
    background: 'dark:bg-neutral-900',
    padding: 'px-0 py-0 sm:p-3 ',
  },
};
defineProps<Props>();
</script>

<template>
  <div>
    <nuxt-link :to="`/game/${game.id}`">
      <UCard :ui="ui" class="rounded-[10px]">
        <template #header>
          <div class="flex justify-center h-64 bg-white">
            <img
              v-if="game.cover_file"
              class="h-full"
              :src="staticUrl + game.cover_file"
              alt=""
            />
            <img v-else src="/chess-placeholder.png" alt="" />
          </div>
        </template>
        <div class="h-16 p-0" v-html="game.name"></div>
      </UCard>
    </nuxt-link>
  </div>
</template>

<style scoped lang="scss"></style>
