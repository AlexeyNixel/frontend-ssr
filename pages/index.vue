<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';
import TheNavigationMobile from '~/components/TheNavigationMobile.vue';
import TheNewsMobile from '~/components/TheNewsMobile.vue';
import TheBillboardMobile from '~/components/TheBillboardMobile.vue';

const generalStore = useGeneralStore();
const toast = useToast();
const { isDesktop } = useDevice();

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
  <client-only v-else><TheBillboardMobile /></client-only>
  <TheNews v-if="isDesktop" />
  <TheNewsMobile v-else />
  <client-only><TheGos /></client-only>
  <TheDepartment />
  <TheExhibitions v-if="isDesktop" />
  <UNotifications class="notification" />
</template>

<style lang="scss" scoped>
.notification {
  @apply top-0 bottom-auto;
}
</style>
