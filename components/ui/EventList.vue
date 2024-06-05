<script setup lang="ts">
import type { BillboardType } from '~/models/baseTypes';
import { useBillboardStore } from '~/stores/billboardStore';
import dayjs from 'dayjs';

interface Props {
  events: BillboardType[];
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
  <div class="" v-if="events.length > 0">
    <ui-the-event v-if="event" v-model="event" :event="event" />

    <article class="event-list" v-else>
      <div class="events-list">
        <div class="current-day">
          <div class="day">{{ dayjs(events[0].eventDate).format('DD') }}</div>
          <div class="month">
            {{ dayjs(events[0].eventDate).format('MMM') }}
          </div>
        </div>
        <div class="events">
          <UButton
            variant="link"
            class="event"
            v-for="item in events"
            :key="item.id"
            @click="handleGetEvent(item?.id)"
          >
            <div class="time">{{ item.eventTime.slice(11, 16) }}</div>
            <div class="title">{{ item.title }}</div>
          </UButton>
        </div>
      </div>
    </article>
  </div>
  <div class="empty-day" v-else>
    <img class="empty-day__image" src="/public/books.svg" alt="" />
    <div class="empty-day__title">Сегодня можете взять книги</div>
  </div>
</template>

<style scoped lang="scss">
.events-list {
  .current-day {
    @apply flex ml-2;
    .day {
      @apply text-xl;
    }
    .month {
      @apply ml-2 self-end;
    }
  }
  .events {
    .event {
      @apply my-2 p-2 w-full odd:bg-neutral-100 dark:odd:bg-neutral-800;
      .time {
        @apply align-text-top mb-auto;
      }
      .time {
        @apply text-start ml-3;
      }
    }
  }
}

.empty-day {
  @apply flex flex-col justify-center items-center w-full h-full;

  &__image {
    @apply w-3/12;
  }

  &__title {
    @apply font-bold text-xl mt-2;
  }
}
</style>
