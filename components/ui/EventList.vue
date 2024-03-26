<script setup lang='ts'>
import { BillboardType } from '~/models/baseTypes';
import { useBillboardStore } from '~/stores/billboardStore';

interface Props {
  events: BillboardType[];
}

const props = defineProps<Props>();
const billboardStore = useBillboardStore();
const event = ref<BillboardType>();
const handleGetEvent = async (slug?: string) => {
  if (slug) event.value = await billboardStore.getBillboard(slug);
  console.log(event.value);
};

const handleCloseEvent = () => {
  event.value = undefined;
};

watch(props, () => {
  event.value = undefined;
});
</script>

<template>
  <div>

    <ui-the-event v-if='event' v-model='event' :event='event'></ui-the-event>
    <UButton
      v-else variant='link'
      class='my-2 text-start odd:bg-neutral-200 mx-4'
      v-for='item in events'
      :key='item.id'
      @click='handleGetEvent(item?.id)'
    >
      {{ item.title }}
    </UButton>
  </div>
</template>

<style scoped lang='scss'>

</style>