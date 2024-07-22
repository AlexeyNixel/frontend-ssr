<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';
import { useEntryStore } from '~/entities/entry';
import { storeToRefs } from 'pinia';
import { useAsyncData } from '#app';
import MainSlider from '~/widgets/main-slider/ui/MainSlider.vue';
import DepartmentsList from '~/widgets/departments-list/ui/DepartmentsList.vue';
import ExhibitionsList from '~/widgets/exhibitions-list/ui/ExhibitionsList.vue';
import GamesList from '~/widgets/games-list/ui/GamesList.vue';
import NavigationMenu from '~/widgets/navigation-menu/ui/NavigationMenu.vue';
import Bookshelf from '~/widgets/bookshelf/ui/Bookshelf.vue';
import GosServices from '~/widgets/gos-services/ui/GosServices.vue';
import EventsCalendar from '~/widgets/events-calendar/ui/EventsCalendar.vue';

const initWidth = ref();

if (process.client) {
  initWidth.value = window.innerWidth;
}

const generalStore = useGeneralStore();
const entryStore = useEntryStore();
const { width } = useWindowSize({
  initialWidth: initWidth.value,
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
  <events-calendar />
  <!--  <USkeleton class="h-[378px]" v-if="!isLoading" />-->
  <!--  <client-only v-else>-->
  <!--    -->
  <!--    <events-calendar-mobile v-else />-->
  <!--  </client-only>-->

  <!--    <entries-list v-if="!isMobile" />-->
  <!--    <entries-list-mobile v-else />-->

  <DepartmentsList />
  <Bookshelf />
  <client-only><GosServices /></client-only>
  <GamesList />
  <ExhibitionsList />
</template>

<style lang="scss" scoped>
.skeleton {
  @apply h-[312px] md:h-[378px];
}
.notification {
  @apply top-0 bottom-auto;
}
</style>
