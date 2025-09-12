<script setup lang="ts">
import { AffichePlaces } from '~/constants/billboardPlaces';
import { useGeneralStore } from '~/stores/generalStore';
import type { BillboardType } from '~/entities/billboard';
import dayjs from 'dayjs';

const props = defineProps<{
  event: BillboardType;
  modelValue: BillboardType;
}>();

const generalStore = useGeneralStore();
const placeName = AffichePlaces;
</script>

<template>
  <div class="event-details">
    <div class="aside">
      <div class="aside__item aside__item_big day">
        {{ dayjs(event.eventDate).format('D') }}
      </div>
      <div class="aside__item">
        {{ dayjs(event.eventDate).format('MMM') }}
      </div>
      <div class="aside__item">({{ dayjs(event.eventDate).format('dd') }})</div>
      <div class="aside__item">{{ event.eventTime.slice(11, 16) }}</div>
    </div>
    <div class="main">
      <div class="header">
        <div class="title" v-html="event.title"></div>
      </div>
      <div class="desc" v-html="event.desc" />
      <div class="info">
        <div class="info__item">{{ event.phone }}</div>
        <div class="info__item" v-text="placeName[event.eventPlace]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.event-details {
  @apply block lg:flex;

  .aside {
    @apply flex lg:block w-2/12 lg:w-1/12 text-center;

    &__item {
      @apply self-end mr-2;

      &_big {
        @apply text-xl lg:text-4xl xl:text-5xl;
      }
    }
  }
  .main {
    @apply w-full lg:w-11/12 pr-3 h-[300px] overflow-y-auto;

    .header {
      @apply flex justify-between;
      .title {
        @apply lg:text-2xl my-2;
      }
    }

    .info {
      @apply flex flex-col;
      &__item {
        @apply self-end;
      }
    }
  }
}
.scroll {
  &::-webkit-scrollbar {
    @apply w-1;
  }

  &::-webkit-scrollbar-track {
    @apply bg-transparent;
  }

  &::-webkit-scrollbar-thumb {
    @apply bg-blue-500 rounded-[10px];
  }
}
</style>
