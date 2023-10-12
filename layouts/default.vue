<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue';
import WorktimeLibrary from '~/components/modals/WorktimeLibrary.vue';
import { useGeneralStore } from '~/stores/generalStore';
import { storeToRefs } from 'pinia';

const generalStore = useGeneralStore()
const {token} = storeToRefs(generalStore)
if (process.client) {
  token.value = localStorage.getItem('token') as string
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
  margin: 0 14vw;
}

@media (min-width: 320px) and (max-width: 1199px) {
  .common-layout {
    margin: 1vw;
  }
}
</style>
