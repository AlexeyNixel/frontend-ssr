<script setup lang="ts">
import EventMobile from '~/entities/billboard/ui/EventMobile.vue';
import Calendar from '~/widgets/calendar/ui/Calendar.vue';
import { useBillboardStore } from '~/entities/billboard';
import { storeToRefs } from 'pinia';

const billboardStore = useBillboardStore();
const { activeComp } = storeToRefs(billboardStore);

const component = {
  event: EventMobile,
  calendar: Calendar,
};
</script>

<template>
  <client-only>
    <div class="billboard">
      <component :is="component[activeComp]" />
    </div>
  </client-only>
</template>

<style scoped lang="scss">
.billboard {
  height: 380px;
}
</style>
