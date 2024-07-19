<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';
import { useEntryStore } from '~/entities/entry';
import { storeToRefs } from 'pinia';
import EntriesList from '~/widgets/entries-list/ui/EntriesList.vue';
import { useAsyncData } from '#app';
import MainSlider from '~/widgets/main-slider/ui/MainSlider.vue';
import DepartmentsList from '~/widgets/departments-list/ui/DepartmentsList.vue';
import ExhibitionsList from '~/widgets/exhibitions-list/ui/ExhibitionsList.vue';
import GamesList from '~/widgets/games-list/ui/GamesList.vue';
import NavigationMenu from '~/widgets/navigation-menu/ui/NavigationMenu.vue';
import Bookshelf from '~/widgets/bookshelf/ui/Bookshelf.vue';
import GosServices from '~/widgets/gos-services/ui/GosServices.vue';
import EntriesListMobile from '~/widgets/entries-list/ui/EntriesListMobile.vue';

const generalStore = useGeneralStore();
const entryStore = useEntryStore();
const { width } = useWindowSize({
  initialWidth: 0,
  initialHeight: 0,
});

const isMobile = computed(() => {
  return width.value < 640;
});

const { anonsy, aktualnoe, sobytiya } = storeToRefs(entryStore);

const isLoading = ref(false);

const params = {
  pageSize: 6,
  orderBy: '-publishedAt',
  include: 'preview',
};

onMounted(() => {
  isLoading.value = true;
  generalStore.token = localStorage.getItem('token') as string;
});

useAsyncData(async () => {
  anonsy.value = await entryStore.getEntries({
    rubric: 'anonsy',
    ...params,
  });

  aktualnoe.value = await entryStore.getEntries({
    rubric: 'aktualnoe',
    ...params,
  });

  sobytiya.value = await entryStore.getEntries({
    rubric: 'sobytiya',
    ...params,
  });
});
</script>

<template>
  <Head>
    <Title>НОМБ</Title>
    <Meta
      name="description"
      content="Новосибирская Областная Молодежная библиотека"
    />
  </Head>

  <MainSlider />
  <NavigationMenu />

  <!--  <events-calendar v-if="!isMobile" />-->
  <!--  <events-calendar-mobile v-else />-->
  <entries-list v-if="!isMobile && !isLoading" />
  <entries-list-mobile v-else />

  <DepartmentsList />
  <Bookshelf />
  <client-only><GosServices /></client-only>
  <GamesList />
  <ExhibitionsList />
</template>

<style lang="scss" scoped>
.notification {
  @apply top-0 bottom-auto;
}
</style>
