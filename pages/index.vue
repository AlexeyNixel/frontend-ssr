<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';

const generalStore = useGeneralStore();
const { isDesktop } = useDevice();
const toast = useToast();
const notification = ref();
const { screenWidth } = storeToRefs(generalStore);

if (process.client) {
  const token = localStorage.getItem('token');
  generalStore.token = token as string;

  window.addEventListener('resize', (e: Event) => {
    if (e.target) {
      screenWidth.value = e.target.innerWidth as number;
    }
  });
}

notification.value = await generalStore.getNotification();

onMounted(() => {
  if (process.client) screenWidth.value = window.innerWidth;
});
</script>

<template>
  <TheSlider />
  <TheNavigation v-if="isDesktop" />
  <TheNavigationMobile v-else />
  <TheBillboard v-if="isDesktop" />
  <client-only v-else><TheBillboardMobile /></client-only>
  <TheNewsList v-if="isDesktop" />
  <TheNewsMobile v-else />
  <TheDepartment />
  <TheBook />
  <TheGos />
  <!--  <client-only></client-only>-->
  <TheGames />
  <TheExhibitions v-if="isDesktop" />
  <UNotifications class="notification" />
</template>

<style lang="scss" scoped>
.notification {
  @apply top-0 bottom-auto;
}
</style>
