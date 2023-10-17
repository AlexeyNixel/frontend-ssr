<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue';
import WorktimeLibrary from '~/components/modals/WorktimeLibrary.vue';
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';

const generalStore = useGeneralStore()
const {token} = storeToRefs(generalStore)
if (process.client) {
  token.value = localStorage.getItem('token') as string
  console.log(window.innerWidth);
}
</script>

<template>
  <div class="common-layout">
    <TheHeader />
    <slot />
  </div>
  <worktime-library />
</template>

<style scoped lang="scss">
.common-layout {
  max-width: 1532px;
  margin: auto;
}

@media (min-width: 1920px) {
  .common-layout {
    max-width: 1920px;
  }
}

@media (min-width: 1364px) and (max-width: 1919px) {
  .common-layout {
    max-width: 1364px;
  }
}

@media (min-width: 980px) and (max-width: 1363px) {
  .common-layout {
    max-width: 980px;
  }
}

@media (max-width: 980px)  {
  .common-layout {
    margin: 1vh;

  }
}
</style>
