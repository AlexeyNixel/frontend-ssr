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
    <div class="content">
      <slot />
    </div>
    <client-only>
      <TheFooter />
    </client-only>
  </div>
  <worktime-library />
</template>

<style scoped lang="scss">
// .common-layout {
//   max-width: 1532px;
//   margin: auto;
// }

// @media (min-width: 1921px) {
//   .common-layout {
//     max-width: 1920px;
//   }
//   .content {
//     min-height: 70.3vh;
//   }
// }

// @media (min-width: 1364px) and (max-width: 1920px) {
//   .common-layout {
//     max-width: 1364px;
//   }
//   .content {
//     min-height: 70.3vh;
//   }
// }

// @media (min-width: 980px) and (max-width: 1363px) {
//   .common-layout {
//     max-width: 980px;
//   }
//   .content {
//     min-height: 70.3vh;
//   }
// }

// @media (max-width: 980px)  {
//   .common-layout {
//     margin: 1vh;
//   }
//   .content {
//     min-height: 70.3vh;
//   }
// }
</style>
