<script setup lang='ts'>
import TheBillboard from '~/components/TheBillboard.vue';
import { setPageLayout } from '#app';
import { useGeneralStore } from '~/stores/generalStore';

const generalStore = useGeneralStore();

if (process.client) {
  const token = localStorage.getItem('token');
  generalStore.token = token as string;
  if (!token) console.log('not found');
}

setPageLayout('default');
</script>

<template>
  <div>
    <the-slider />
    <the-navigation />
    <TheBillboard />
    <TheNews />
    <TheDepartment />
    <client-only>
      <TheGos />
      <TheExhibitions />
      <TheFooter />
    </client-only>
  </div>
</template>

<style scoped>

</style>