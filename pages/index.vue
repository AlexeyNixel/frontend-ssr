<script setup lang='ts'>

import TheBillboard from '~/components/TheBillboard.vue';
</script>

<template>
  <div>
    <the-slider />
    <the-navigation />
    <TheBillboard/>
    <TheNews />
    <client-only>
      <TheGos/>
    </client-only>
    <TheDepartment />
  </div>
</template>

<style scoped>

</style>