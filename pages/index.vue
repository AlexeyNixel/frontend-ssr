<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';
import TheBook from '~/components/TheBook.vue';

const generalStore = useGeneralStore();
const { isDesktop } = useDevice();
const toast = useToast();
const notification = ref();
if (process.client) {
  const token = localStorage.getItem('token');
  generalStore.token = token as string;
}

notification.value = await generalStore.getNotification();

onMounted(() => {
  if (notification.value) {
    if (
      process.client &&
      localStorage.getItem('notification') !== notification.value.id
    ) {
      localStorage.setItem('notification', notification.value.id);
      toast.add({
        title: `${notification.value.desc}. Читать подробнее`,
        timeout: 30000,
        ui: {
          container: 'top-0 left-0',
        },
        click: () => {
          navigateTo(`/entry/${notification.value.entryId}`);
        },
      });
    }
  }
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
  <!-- <TheNews v-if="isDesktop" /> -->
  <TheDepartment />
  <TheBook />
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
