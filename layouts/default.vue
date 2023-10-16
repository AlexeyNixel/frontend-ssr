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
  max-width: 1270px;
  margin: auto;
}

@media (min-width: 992px) and (max-width: 1269px) {
  .common-layout {
    max-width: 992px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .common-layout {
    max-width: 768px;

  }
}

@media (max-width: 767px)  {
  .common-layout {
    margin: 1vh;

  }
}
</style>
