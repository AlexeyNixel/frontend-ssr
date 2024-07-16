<script setup lang="ts">
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';
import Header from '~/widgets/header/ui/Header.vue';
import Footer from '~/widgets/footer/ui/Footer.vue';

const generalStore = useGeneralStore();
const { token } = storeToRefs(generalStore);
if (process.client) {
  token.value = localStorage.getItem('token') as string;
}
</script>

<template>
  <div class="default-layout">
    <Header />
    <div class="content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  @apply flex flex-col px-2 lg:p-0 mx-auto 2xl:max-w-screen-xl xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm;
  .content {
    min-height: calc(100vh - 341px);
  }
}
</style>
