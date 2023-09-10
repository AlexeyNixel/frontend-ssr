<script setup lang='ts'>
import TheBillboard from '~/components/TheBillboard.vue';

if (process.client) {
  const token = localStorage.getItem('token')
  if (!token) console.log('not found');
}

</script>

<template>
  <div>
    <the-slider />
    <the-navigation />
    <TheBillboard/>
    <TheNews />
    <TheDepartment />
    <client-only>
      <TheGos/>
    </client-only>
    <TheFooter />
  </div>
</template>

<style scoped>

</style>