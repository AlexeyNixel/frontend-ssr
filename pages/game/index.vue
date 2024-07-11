<script lang="ts" setup>
import { GameCard, type GameResponseType, useGameStore } from '~/entities/game';

const ui = {
  icon: {
    trailing: {
      pointer: '',
    },
  },
  rounded: 'rounded-[10px]',
  variant: {
    none: 'bg-white dark:bg-neutral-900 border-0 shadow-0 focus:ring-{color}-500 dark:focus:ring-{color}-400',
  },
};

const { isDesktop } = useDevice();
const route = useRoute();
const gameStore = useGameStore();
const activeGenres = ref<any>([]);
const games = ref<GameResponseType>();
const genres = ref<[{ tag: string; desc: string; status: boolean }]>();

const search = ref<string>();
const page = ref<number>(Number(route.query.page) || 1);

genres.value = await gameStore.getGenres();
genres.value?.forEach((item) => {
  item['status'] = false;
});

const fetchData = async () => {
  games.value = await gameStore.getGames({
    pageSize: 15,
    page: page.value,
    genres: activeGenres.value,
    search: search.value,
  });
};

const handleNavigate = (val?: number) => {
  if (val) page.value = val;
  if (process.client) window.scroll(0, 0);
  navigateTo({
    path: '/game',
    query: {
      genres: activeGenres.value,
      page: page.value,
    },
  });

  fetchData();
};

const handleSelectGenres = () => {
  let gen: any = [];
  genres.value?.forEach((item) => {
    if (item.status) {
      gen.push(item.tag);
    }
  });
  activeGenres.value = gen;
  fetchData();
  navigateTo({ path: '/game', query: { genres: activeGenres.value } });
};

useAsyncData(async () => {
  await fetchData();
});

onBeforeMount(async () => {
  if (route.query.genres) {
    if (typeof route.query.genres === 'string') {
      activeGenres.value.push(route.query.genres);
    } else {
      activeGenres.value = route.query.genres;
    }
  }

  genres.value?.forEach((item) => {
    if (activeGenres.value.includes(item.tag)) {
      item.status = true;
    }
  });
});
</script>

<template>
  <div class="games block lg:flex" v-if="games">
    <div class="aside">
      <UCheckbox
        class="aside__item"
        v-for="item in genres"
        :key="item.tag"
        v-model="item.status"
        @update:model-value="handleSelectGenres()"
        :label="item.desc"
      />
    </div>
    <div class="main">
      <div class="header">
        <UInput
          @keydown.enter="handleNavigate(1)"
          variant="none"
          icon="i-heroicons-magnifying-glass-20-solid"
          size="sm"
          :ui="ui"
          color="white"
          :trailing="false"
          placeholder="Поиск..."
          v-model="search"
        />
      </div>
      <div class="games-grid" v-if="games.data.length > 0">
        <game-card v-for="item in games.data" :key="item.id" :game="item" />
      </div>
      <div v-else class="not-found">Игр не найдено</div>
      <UPagination
        class="flex justify-center my-4"
        v-model="page"
        :page-count="games.meta?.pageSize"
        :total="games.meta.pages * 10"
        @update:model-value="handleNavigate()"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.games {
  .aside {
    @apply flex flex-wrap h-max lg:sticky lg:w-[25%] top-2 bg-white;
    @apply dark:bg-neutral-900 rounded-[10px] p-2 my-2 lg:my-0;

    &__item {
      @apply lg:w-full m-2;
    }
  }
  .main {
    @apply w-full lg:w-[75%] m-0 lg:ml-2;

    .header {
      @apply mb-2 p-2 bg-white dark:bg-neutral-900 rounded-[10px];
    }
    .games-grid {
      @apply bg-white dark:bg-neutral-900 rounded-[10px] grid;
      @apply grid-cols-1 lg:grid-cols-3 gap-2 p-4;
    }
    .not-found {
      @apply flex items-center justify-center w-full h-full text-2xl;
    }
  }
}
</style>
