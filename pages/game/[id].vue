<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { GameCard, useGameStore } from '~/entities/game';

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
const genresTrans = ref<{ [key: string]: string }>({});

const route = useRoute();
const gameStore = useGameStore();
const { game } = storeToRefs(gameStore);
const { games } = storeToRefs(gameStore);
const { genres } = storeToRefs(gameStore);
const slug = computed(() => route.params.id as string);

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
  <div class="game" v-if="game">
    <div class="game__preview">
      <img v-if="game.cover_file" :src="staticUrl + game.cover_file" alt="" />
      <img v-else src="/chess-placeholder.png" class="bg-white" alt="" />
    </div>
    <div class="game__body">
      <header class="header">
        <h3 class="title" v-html="game.name" />
        <p class="short-description" v-html="game.short_description" />
        <div class="categories">
          <nuxt-link
            class="categories__link"
            v-for="item in game.genres.split('; ')"
            :key="item"
            :to="{ path: '/game', query: { genres: item } }"
          >
            {{ genresTrans[item] }}
          </nuxt-link>
        </div>
        <div class="release-date" v-if="game.game_year">
          Дата выхода: {{ game.game_year }}
        </div>
      </header>
      <UTabs :ui="ui" :items="items" class="tabs-menu">
        <template #item="{ item }">
          <div class="tabs-menu__description" v-if="item.key === 'desc'">
            <p v-html="game.full_description" />
            <div class="specifications">
              <div class="item">
                <Icon class="item__icon" name="mdi:users" />
                <div class="item__text" v-if="game.player_min > 0">
                  {{ game.player_min }} - {{ game.player_max }}
                </div>
                <div class="item__text" v-else>Неограниченно</div>
              </div>
              <div class="item">
                <Icon class="item__icon" name="mdi:clock-outline" />
                <div class="item__text" v-if="game.game_duration">
                  {{ game.game_duration }}
                </div>
                <div class="item__text" v-else>Неограниченно</div>
              </div>
              <div class="item">
                <div class="item__text_big">{{ game.player_age }}+</div>
              </div>
            </div>
          </div>

          <div v-if="item.key === 'rules'" class="tabs-menu__rules">
            <NuxtLink
              class="item"
              :to="`${ruleUrl}${game.rules_file}`"
              target="_blank"
            >
              <Icon class="item__icon" name="bxs:file-pdf" />
              <div class="item__text">{{ game.name }}. Правила</div>
            </NuxtLink>
          </div>
          <div class="tabs-menu__more-games" v-if="item.key === 'serials'">
            <game-card v-for="item in games" :key="item.id" :game="item" />
          </div>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game {
  @apply my-10 flex-row-reverse lg:flex lg:flex-row;

  &__preview {
    @apply lg:w-6/12 flex mx-4 justify-center;

    img {
      @apply w-full h-max;
    }
  }

  &__body {
    @apply lg:w-6/12;

    .header {
      .title {
        @apply mb-2 text-2xl font-bold;
      }

      .short-description {
        @apply my-2;
      }

      .categories {
        @apply flex;

        &__link {
          @apply mr-4 mb-2 text-gray-500 underline;
        }
      }

      .release-date {
        @apply text-gray-500 text-sm my-2;
      }
    }

    .tabs-menu {
      &__description {
        .specifications {
          @apply grid grid-cols-3 my-2;

          .item {
            @apply flex items-center mr-4  rounded-[10px] px-2;

            &__icon {
              @apply text-4xl mr-2 text-blue-500;
            }

            &__text {
              &_big {
                @apply text-2xl font-bold;
              }
            }
          }
        }
      }

      &__rules {
        .item {
          @apply flex items-center hover:underline;

          &__icon {
            @apply text-red-500 text-4xl;
          }

          &__text {
            @apply self-end;
          }
        }
      }

      &__more-games {
        @apply grid grid-cols-2 gap-4;
      }
    }
  }
}
</style>
