<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';

const generalStore = useGeneralStore();
const { isDesktop } = useDevice();
const toast = useToast();
if (process.client) {
  const token = localStorage.getItem('token');
  generalStore.token = token as string;
}

const notification = await generalStore.getNotification();
onMounted(() => {
  if (notification) {
    toast.add({
      title: notification.desc,
      timeout: 15000,
      ui: {
        container: 'top-0 left-0',
      },
    });
  }
});
</script>

<template>
  <TheSlider />
  <TheNavigation v-if="isDesktop" />
  <TheNavigationMobile v-else />
  <TheBillboard v-if="isDesktop" />
  <TheBillboardMobile v-else />
  <TheNews v-if="isDesktop" />
  <TheNewsMobile v-else />
  <TheDepartment />
  <client-only><TheGos /></client-only>
  <TheGames />
  <TheExhibitions v-if="isDesktop" />
  <UNotifications class="notification" />
</template>

<style lang="scss" scoped>
.notification {
  @apply top-0 bottom-auto;
}
</style>
