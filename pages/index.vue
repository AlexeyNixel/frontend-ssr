<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';
import { useEntryStore } from '~/stores/entryStore';

const generalStore = useGeneralStore();
const entryStore = useEntryStore();
const { isDesktop } = useDevice();

const { anonsy, aktualnoe, sobytiya } = storeToRefs(entryStore);

const params = {
  pageSize: 6,
  orderBy: '-publishedAt',
  include: 'preview',
};

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

onMounted(() => {
  generalStore.token = localStorage.getItem('token') as string;
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
  <TheSlider />
  <TheNavigation />
  <TheBillboard v-if="isDesktop" />
  <client-only v-else><TheBillboardMobile /></client-only>
  <TheNewsList />
  <TheDepartment />
  <ReaderZone />
  <client-only><TheGos /></client-only>
  <TheGames />
  <TheExhibitions />
</template>

<style lang="scss" scoped>
.notification {
  @apply top-0 bottom-auto;
}
</style>
