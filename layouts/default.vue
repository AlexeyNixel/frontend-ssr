<script setup lang='ts'>

import TheHeader from '~/components/TheHeader.vue';
import WorktimeLibrary from '~/components/modals/WorktimeLibrary.vue';
</script>

<template>
  <div class='common-layout'>
    <TheHeader />
    <slot />
  </div>
  <worktime-library />
</template>

<style scoped lang='scss'>
.common-layout {
  margin: 0 14vw;
}

</style>