<script setup lang="ts">
import dayjs from 'dayjs';
import { BillboardType } from '~/models/baseTypes';
import { AffichePlaces } from '~/constants/billboardPlaces';
import { useGeneralStore } from '~/stores/generalStore';

interface Props {
  event: BillboardType;
  modelValue: BillboardType;
}

defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const handleCloseEvent = () => {
  emit('update:modelValue', undefined);
};

const generalStore = useGeneralStore();

const placeName = AffichePlaces;
</script>

<template>
  <div class="flex w-full">
    <div class="lg:w-[12%] xl:w-[10%] text-center">
      <div class="text-5xl">{{ dayjs(event.eventDate).format('D') }}</div>
      <div>{{ event.eventTime.slice(11, 16) }}</div>
      <div class="month">{{ dayjs(event.eventDate).format('MMM') }}</div>
      <div class="day-name">({{ dayjs(event.eventDate).format('dd') }})</div>
      <NuxtLink
        :to="`http://admin.infomania.ru/billboard/update/${event.id}`"
        class="slider__update"
        v-if="generalStore.token"
      >
        <Icon
          class="text-2xl hover:rotate-180 transition"
          name="mdi:cog"
        />
      </NuxtLink>
      <UButton @click="handleCloseEvent"> ←</UButton>
    </div>
    <!-- <div class="w-[7%] mt-5 text-center"></div> -->
    <div
      class="max-h-[314px] overflow-y-scroll lg:w-[83%] xl:w-[86%] mr-2 scroll"
    >
      <div class="flex">
        <div
          class="text-2xl"
          v-html="event.title"
        />
      </div>
      <div class="">
        <div
          class="desc"
          v-html="event.desc"
        />
        <div class="flex flex-col">
          <div class="self-end">{{ event.phone }}</div>
          <div
            class="self-end"
            v-text="placeName[event.eventPlace]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
