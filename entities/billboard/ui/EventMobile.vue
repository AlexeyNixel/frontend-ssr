<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AffichePlaces } from '~/constants/billboardPlaces';
import { useBillboardStore } from '~/entities/billboard';

const billboardStore = useBillboardStore();
const { selectedEvents } = storeToRefs(billboardStore);
const { activeComp } = storeToRefs(billboardStore);
const placeName = AffichePlaces;
</script>

<template>
  <Swiper
    :modules="[SwiperPagination]"
    :pagination="true"
    v-if="selectedEvents"
    class="h-[380px]"
  >
    <SwiperSlide class="h-[full]" v-for="item in selectedEvents" :key="item.id">
      <div class="flex justify-between items-center mx-3 h-[80px]">
        <div class="">{{ item.title }}</div>
        <UButton @click="activeComp = 'calendar'">
          <Icon class="text-3xl" name="pajamas:close" />
        </UButton>
      </div>
      <div class="mx-3">
        <div class="h-[250px] overflow-y-scroll" v-html="item.desc"></div>
        <div class="h-[50px] flex items-center justify-between">
          <div class="flex flex-row-reverse">
            <div class="text-sm">{{ placeName[item.eventPlace] }}</div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>
