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
  <div
    class="mx-auto 2xl:max-w-screen-xl xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm"
  >
    <TheHeader />
    <div class="min-h-[70.3vh]">
      <slot />
    </div>
    <client-only>
      <TheFooter />
    </client-only>
  </div>
  <worktime-library />
</template>

<style scoped lang="scss">

</style>
