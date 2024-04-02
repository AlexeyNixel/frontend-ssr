<script setup lang="ts">
import { BillboardType } from '~/models/baseTypes';
import { useBillboardStore } from '~/stores/billboardStore';
import dayjs from 'dayjs';

interface Props {
  events: BillboardType[];
  day: string;
}

const props = defineProps<Props>();
const billboardStore = useBillboardStore();
const event = ref<BillboardType>();
const handleGetEvent = async (slug?: string) => {
  if (slug) event.value = await billboardStore.getBillboard(slug);
};

onMounted(async () => {
  if (props.events.length === 1) {
    event.value = props.events[0];
  }
});

watch(props, () => {
  event.value = undefined;
  if (props.events.length === 1) {
    event.value = props.events[0];
  }
});
</script>

<template>
  <div>
    <div
      v-if="!event"
      class="flex mx-6"
    >
      <div class="text-2xl">{{ dayjs(day).format('DD') }}</div>
      <div class="flex ml-2 self-end">{{ dayjs(day).format('MMM') }}</div>
    </div>
    <ui-the-event
      v-if="event"
      v-model="event"
      :event="event"
    ></ui-the-event>

    <UButton
      v-else
      variant="link"
      class="my-2 text-start odd:bg-neutral-100 dark:odd:bg-neutral-800 mx-4"
      v-for="item in events"
      :key="item.id"
      @click="handleGetEvent(item?.id)"
    >
      <div>{{ item.eventTime.slice(11, 16) }}</div>
      {{ item.title }}
    </UButton>
  </div>
</template>

<style scoped lang="scss"></style>
