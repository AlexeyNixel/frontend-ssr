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
import CalendarEvent from '~/widgets/calendar-event/ui/CalendarEvent.vue';
import CalendarEventMobile from '~/widgets/calendar-event/ui/CalendarEventMobile.vue';

const generalStore = useGeneralStore();
const entryStore = useEntryStore();
const { isDesktop } = useDevice();

const { anonsy, aktualnoe, sobytiya } = storeToRefs(entryStore);

const params = {
  pageSize: 6,
  orderBy: '-publishedAt',
  include: 'preview',
};

onMounted(() => {
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
  <TheNavigation />
  <CalendarEvent v-if="isDesktop" />
  <client-only v-else><CalendarEventMobile /></client-only>
  <entries-list />
  <DepartmentsList />
  <ReaderZone />
  <client-only><TheGos /></client-only>
  <GamesList />
  <ExhibitionsList />
</template>

<style lang="scss" scoped>
.notification {
  @apply top-0 bottom-auto;
}
</style>
