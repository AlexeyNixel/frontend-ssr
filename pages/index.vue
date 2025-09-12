<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';
import { useEntryStore } from '~/entities/entry';
import { storeToRefs } from 'pinia';
import { useAsyncData } from '#app';
import MainSlider from '~/widgets/main-slider/ui/MainSlider.vue';
import ExhibitionsList from '~/widgets/exhibitions-list/ui/ExhibitionsList.vue';
import GamesList from '~/widgets/games-list/ui/GamesList.vue';
import NavigationMenu from '~/widgets/navigation-menu/ui/NavigationMenu.vue';
import Bookshelf from '~/widgets/bookshelf/ui/Bookshelf.vue';
import GosServices from '~/widgets/gos-services/ui/GosServices.vue';
import EventsCalendar from '~/widgets/events-calendar/ui/EventsCalendar.vue';
import EntryMenu from '~/widgets/entry-menu/ui/EntryMenu.vue';
import { BookVoteModal } from '~/widgets/book-vote-menu';
import { MinkultGolosovanie } from '~/widgets/minkult-golosovanie';

const route = useRoute();

const generalStore = useGeneralStore();
const entryStore = useEntryStore();

const isShowEventButton = ref(true);

const { anonsy, aktualnoe, sobytiya } = storeToRefs(entryStore);
const { open: modal } = useModal();
const isLoading = ref(false);

const params = {
  pageSize: 6,
  orderBy: '-publishedAt',
  include: 'preview',
};

const openModal = () => {
  modal(BookVoteModal);
};

onMounted(() => {
  isLoading.value = true;
  generalStore.token = localStorage.getItem('token') as string;

  if (route.query.event === 'readaboutwar') {
    openModal();
  }
});

useAsyncData(async () => {
  const { result: anonsy1 } = await entryStore.getEntries({
    rubric: 'anonsy',
    ...params,
  });
  anonsy.value = anonsy1;
  const { result: aktualnoe1 } = await entryStore.getEntries({
    rubric: 'aktualnoe',
    ...params,
  });
  aktualnoe.value = aktualnoe1;
  const { result: sobytiya1 } = await entryStore.getEntries({
    rubric: 'sobytiya',
    ...params,
  });
  sobytiya.value = sobytiya1;
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
  <entry-menu />
  <Bookshelf />
  <div class="block md:flex my-4">
    <client-only>
      <gos-services />
    </client-only>
    <MinkultGolosovanie class="" />
  </div>
  <GamesList />
  <ExhibitionsList />
  <UNotifications />
</template>

<style lang="scss" scoped>
.skeleton {
  @apply h-[312px] md:h-[378px];
}
.notification {
  @apply top-0 bottom-auto;
}

.event-btn {
  @apply flex z-50 fixed bottom-[50px] right-[250px];

  .close-btn {
    @apply float-end bg-white dark:bg-neutral-800 flex w-max p-2 rounded-2xl shadow-xl active:scale-90 transition cursor-pointer;
  }

  .logo {
    @apply cursor-pointer;
  }
}
</style>
