<script setup lang="ts">
import { type GameType } from '~/entities/game';

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
    <nuxt-link class="game-link" :to="`/game/${game.id}`">
      <UCard :ui="ui" class="game-card rounded-[10px]">
        <template #header>
          <div class="game-card__preview flex justify-center h-64 bg-white">
            <img
              v-if="game.cover_file"
              class="h-full"
              :src="staticUrl + game.cover_file"
              alt=""
            />
            <img v-else src="/chess-placeholder.png" alt="" />
          </div>
        </template>
        <div
          class="game-card__title h-16 p-0 text-black dark:text-white"
          v-html="game.name"
        ></div>
      </UCard>
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.game-card {
  @apply h-max;
  &__preview {
    img {
      @apply h-[300px] w-full object-cover;
    }
  }
  &__title {
    @apply h-max;
  }
}
</style>
