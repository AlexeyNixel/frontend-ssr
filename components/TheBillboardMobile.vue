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
