<script setup lang="ts">
import { useBillboardStore } from '~/stores/billboardStore';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import { AffichePlaces } from '~/constants/billboardPlaces';
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
        <UBotton @click="activeComp = 'calendar'">
          <Icon class="text-3xl" name="pajamas:close" />
        </UBotton>
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

<style scoped lang="scss"></style>
