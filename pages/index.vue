<script setup lang='ts'>
import { setPageLayout } from '#app';
import { useGeneralStore } from '~/stores/generalStore';
import TheTestBillboard from '~/components/TheTestBillboard.vue';
import { storeToRefs } from 'pinia';

const generalStore = useGeneralStore();

const { isDesktop } = useDevice();

if (process.client) {
  const token = localStorage.getItem('token');
  generalStore.token = token as string;
}

setPageLayout('default');
</script>

<template>
  <TheSlider/>
  <TheNavigation v-if='isDesktop'/>
  <TheNavigationMobile v-else/>
  <client-only v-if='isDesktop'><TheTestBillboard/></client-only>
  <client-only v-else><TheBillboardMobile/></client-only>
  <TheNews v-if='isDesktop'/>
  <TheNewsMobile v-else/>
  <client-only><TheGos/></client-only>
  <TheDepartment/>
  <TheExhibitions v-if='isDesktop'/>
  <TheFooter/>
</template>

<style scoped>

</style>