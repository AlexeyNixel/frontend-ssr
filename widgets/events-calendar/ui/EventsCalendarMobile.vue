<script setup lang="ts">
import Calendar from '~/widgets/calendar/ui/Calendar.vue';
import EventMobile from '~/entities/billboard/ui/EventMobile.vue';
import { useBillboardStore } from '~/entities/billboard';

const billboardStore = useBillboardStore();
</script>

<template>
  <div>
    <EventMobile v-if="billboardStore.billboard.length > 0" />
    <Calendar v-else />
  </div>
</template>

<style scoped lang="scss"></style>
