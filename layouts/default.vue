<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue';
import WorktimeLibrary from '~/components/modals/WorktimeLibrary.vue';
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';

const generalStore = useGeneralStore();
const { token } = storeToRefs(generalStore);
if (process.client) {
  token.value = localStorage.getItem('token') as string;
}
</script>

<template>
  <div class="default-layout">
    <TheHeader />
    <div class="content">
      <slot />
    </div>
    <TheFooter class="footer" />
  </div>
  <worktime-library />
</template>

<style scoped lang="scss">
.default-layout {
  @apply flex flex-col px-2 lg:p-0 mx-auto 2xl:max-w-screen-xl xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm;
  .content {
    min-height: calc(100vh - 341px);
  }
}
</style>
