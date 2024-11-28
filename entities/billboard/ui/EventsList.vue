<script setup lang="ts">
import { type BillboardType, useBillboardStore } from '~/entities/billboard';
import dayjs from 'dayjs';
import EventDetails from './EventDetails.vue';
import { storeToRefs } from 'pinia';

const daya = dayjs();
const billboardStore = useBillboardStore();
const event = ref<BillboardType>();
const { billboard } = storeToRefs(billboardStore);

onMounted(async () => {
  if (billboardStore.billboard?.length === 1) {
    event.value = billboardStore.billboard[0];
  }
});

watch(billboard, () => {
  event.value = undefined;

  if (billboard.value.length === 1) {
    event.value = billboard.value[0];
  }
});

const handleGetEvent = async (slug: any) => {
  if (slug) event.value = slug;
};

const closeWindow = () => {
  billboard.value = [];
};
</script>

<template>
  <div class="" v-if="billboard?.length > 0">
    <event-details v-if="event" v-model="event" :event="event" />

    <div class="event-list" v-else>
      <div class="header">
        <div class="day">
          {{ dayjs(billboard[0].eventDate).format('DD') }}
        </div>
        <div class="month">
          {{ dayjs(billboard[0].eventDate).format('MMM') }}
        </div>
      </div>
      <div class="body">
        <div
          class="body__item"
          @click="handleGetEvent(item)"
          v-for="item in billboard"
          :key="item.id"
        >
          <div class="time">{{ item.eventTime.slice(11, 16) }}</div>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="empty-day" v-else>
    <img class="empty-day__image" src="/public/books.svg" alt="" />
    <div class="empty-day__title">Сегодня можете взять книги</div>
  </div>
</template>

<style scoped lang="scss">
.event-list {
  .header {
    @apply flex;

    .day {
      @apply text-xl;
    }

    .month {
      @apply self-end ml-2;
    }
  }

  .body {
    @apply h-[290px] overflow-y-auto;

    &__item {
      @apply odd:bg-neutral-200 odd:dark:bg-neutral-800 flex p-2 rounded-[10px];
      @apply my-2 hover:bg-neutral-300 hover:dark:bg-neutral-700 transition;
      @apply cursor-pointer;

      .time {
        @apply mr-2 flex items-center;
      }
    }
  }
}

.empty-day {
  @apply flex-col justify-center items-center w-full h-full hidden sm:flex;

  &__image {
    @apply w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12;
  }

  &__title {
    @apply font-bold text-xl mt-2;
  }
}
</style>
