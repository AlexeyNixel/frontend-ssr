<script setup lang="ts">
import TheEventMobile from '~/components/ui/TheEventMobile.vue';
import TheCalendar from '~/components/TheCalendar.vue';
import { useBillboardStore } from '~/stores/billboardStore';
import { storeToRefs } from 'pinia';

const billboardStore = useBillboardStore();
const { activeComp } = storeToRefs(billboardStore);

const component = {
  event: TheEventMobile,
  calendar: TheCalendar,
};
</script>

<template>
  <div class="billboard">
    <component :is="component[activeComp]" />
  </div>
</template>

<style scoped lang="scss">
.billboard {
  height: 445px;
}
</style>
