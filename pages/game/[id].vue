<script lang="ts" setup>
import TheGame from '~/components/ui/TheGame.vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '~/stores/gameStore';

const ui = {
  list: {
    base: 'relative',
    background: 'bg-gray-100 dark:bg-neutral-900',
    rounded: 'rounded-lg',
    shadow: '',
    padding: 'p-1',
    height: 'h-10',
    width: 'w-full',
    marker: {
      wrapper:
        'absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none',
      base: 'w-full h-full',
      background: 'bg-white dark:bg-neutral-800',
      rounded: 'rounded-md',
      shadow: 'shadow-sm',
    },
  },
};

const ruleUrl = ref(import.meta.env['VITE_GAME_RULE_URL']);
const staticUrl = ref(import.meta.env['VITE_GAME_STATIC_URL']);

const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const { games } = storeToRefs(gameStore);
const { genres } = storeToRefs(gameStore);

const route = useRoute();
const slug = computed(() => route.params.id as string);

const genresTrans = ref<{ [key: string]: string }>({});

await gameStore.getGenres();
await gameStore.getGame(slug.value);

const search = ref<string[]>(game.value?.name.split(/:|[.]/) || ['']);

if (search.value[0]) {
  await gameStore.getGames({
    search: search.value[0],
  });
}

const items = ref([
  {
    key: 'desc',
    label: 'Описание',
  },
  {
    key: 'rules',
    label: 'Правила игры',
    disabled: game.value?.rules_file === '',
  },
  {
    key: 'serials',
    label: 'Игры серии',
    disabled: games.value?.length < 2,
  },
]);

genres.value?.forEach((item) => {
  genresTrans.value[item.tag] = item.desc;
});
</script>

<template>
  <div v-if="game">
    <div class="my-10 flex-row-reverse lg:flex lg:flex-row">
      <div class="lg:w-6/12 flex mx-4 justify-center">
        <client-only>
          <viewer
            rebuild
            @inited="inited"
          >
            <img
              class="h-[300px] lg:h-[800px] object-cover"
              :src="staticUrl + game.cover_file"
              alt=""
            />
          </viewer>
        </client-only>
      </div>
      <div class="lg:w-6/12">
        <div
          class="mb-2 text-2xl font-bold"
          v-html="game.name"
        ></div>
        <div
          class="my-2"
          v-html="game.short_description"
        ></div>
        <div class="flex">
          <nuxt-link
            :to="{ path: '/game', query: { genres: item } }"
            class="mr-4 mb-2 text-gray-500 underline"
            v-for="item in game.genres.split('; ')"
          >
            {{ genresTrans[item] }}
          </nuxt-link>
        </div>
        <div
          class="text-gray-500 text-sm my-2"
          v-if="game.game_year"
        >
          Дата выхода: {{ game.game_year }}
        </div>
        <UTabs
          :ui="ui"
          :items="items"
        >
          <template #item="{ item }">
            <div v-if="item.key === 'desc'">
              <div v-html="game.full_description"></div>
              <div class="grid grid-cols-3 my-2">
                <div class="item">
                  <Icon
                    class="item__icon"
                    name="mdi:users"
                  />
                  <div
                    class="item__text"
                    v-if="game.player_min > 0"
                  >
                    {{ game.player_min }} - {{ game.player_max }}
                  </div>
                  <div
                    class="item__text"
                    v-else
                  >
                    Неограниченно
                  </div>
                </div>
                <div class="item">
                  <Icon
                    class="item__icon"
                    name="mdi:clock-outline"
                  />
                  <div
                    class="item__text"
                    v-if="game.game_duration"
                  >
                    {{ game.game_duration }}
                  </div>
                  <div
                    class="item__text"
                    v-else
                  >
                    Неограниченно
                  </div>
                </div>
                <div class="item">
                  <div class="text-2xl font-bold">{{ game.player_age }}+</div>
                </div>
              </div>
            </div>

            <div v-if="item.key === 'rules'">
              <NuxtLink
                class="item"
                :to="`${ruleUrl}${game.rules_file}`"
                target="_blank"
              >
                <Icon
                  class="text-red-600 item__icon"
                  name="bxs:file-pdf"
                />
                <div class="item__text">{{ game.name }}. Правила</div>
              </NuxtLink>
            </div>
            <div
              class="grid grid-cols-2 gap-4"
              v-if="item.key === 'serials'"
            >
              <TheGame
                v-for="item in games"
                :key="item.id"
                :game="item"
              />
            </div>
          </template>
        </UTabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item {
  @apply flex items-center mr-4 bg-white rounded-[10px] px-2;

  &__icon {
    @apply text-4xl mr-2 text-blue-500;
  }
}
</style>
