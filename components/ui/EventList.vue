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
  <div class="">
    <ui-the-event
      v-if="event"
      v-model="event"
      :event="event"
    />
    <article
      class="event-list"
      v-else
    >
      <section class="flex">
        <div class="flex self-end text-2xl">{{ dayjs(day).format('DD') }}</div>
        <div class="flex ml-2 self-end">{{ dayjs(day).format('MMM') }}</div>
      </section>
      <section class="w-full">
        <UButton
          variant="link"
          class="my-2 p-2 w-full odd:bg-neutral-100 dark:odd:bg-neutral-800"
          v-for="item in events"
          :key="item.id"
          @click="handleGetEvent(item?.id)"
        >
          <div class="align-text-top mb-auto">
            {{ item.eventTime.slice(11, 16) }}
          </div>
          <div class="text-start ml-3">
            {{ item.title }}
          </div>
        </UButton>
      </section>
    </article>
  </div>
</template>

<style scoped lang="scss">
.event-list {
}
</style>
