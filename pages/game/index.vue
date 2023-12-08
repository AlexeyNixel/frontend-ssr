<script lang="ts" setup>
import { GameType } from 'models/baseTypes';
import { useGameStore } from '~/stores/gameStore';
import TheGame from '~/components/ui/TheGame.vue';
import { storeToRefs } from 'pinia';

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

const route = useRoute();
const gameStore = useGameStore();
const activeGenres = ref<any>([]);
const games = ref<GameType[]>([]);
const genres = ref<[{ tag: string; desc: string; status: boolean }]>();
const { metaGames } = storeToRefs(gameStore);
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

  await fetchData();
});
</script>

<template>
  <div class="flex">
    <div
      class="sticky h-max top-2 w-[25%] bg-white dark:bg-neutral-900 rounded-[10px] p-2"
    >
      <div class="item" v-for="item in genres" :key="item.tag">
        <UCheckbox
          class="my-2"
          v-model="item.status"
          @update:model-value="handleSelectGenres()"
          name="item"
          :label="item.desc"
        />
      </div>
    </div>
    <div class="w-[75%] ml-2">
      <div class="mb-2 p-2 bg-white dark:bg-neutral-900 rounded-[10px]">
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
      <div
        class="bg-white dark:bg-neutral-900 rounded-[10px] grid grid-cols-3 gap-2 p-4"
        v-if="games.length > 0"
      >
        <the-game v-for="item in games" :key="item.id" :game="item" />
      </div>
      <div
        v-else
        class="flex items-center justify-center w-full h-full text-2xl"
      >
        <Placeholder class="h-8" />
        Игр не найдено
      </div>
      <UPagination
        v-if="metaGames"
        class="flex justify-center my-4"
        v-model="page"
        :total="metaGames.pages * 10"
        @update:model-value="handleNavigate()"
      />
    </div>
  </div>
</template>
