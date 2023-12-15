<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';

const generalStore = useGeneralStore();

const { isDesktop } = useDevice();

if (process.client) {
  const token = localStorage.getItem('token');
  generalStore.token = token as string;
}
</script>

<template>
  <TheSlider />
  <TheNavigation v-if="isDesktop" />
  <TheNavigationMobile v-else />
  <TheBillboard v-if="isDesktop" />
  <client-only v-else><TheBillboardMobile /></client-only>
  <TheNewsList v-if="isDesktop" />
  <TheNewsMobile v-else />
  <!-- <TheNews v-if="isDesktop" /> -->
  <client-only><TheGos /></client-only>
  <TheDepartment />
  <TheExhibitions v-if="isDesktop" />
</template>

<style scoped></style>
