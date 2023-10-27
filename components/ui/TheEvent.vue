<script setup lang='ts'>
import dayjs from 'dayjs';
import { BillboardType } from '~/models/baseTypes';
import { AffichePlaces } from '~/constants/billboardPlaces';
import {useGeneralStore} from "~/stores/generalStore";

const generalStore = useGeneralStore()
type EventType = { event: BillboardType }
defineProps<EventType>();
const placeName = AffichePlaces;
</script>

<template>
  <div class='event'>
    <div class='event__date'>
      <div class='day'>{{ dayjs(event.eventDate).format('D') }}</div>
      <div class='time'>{{ event.eventTime.slice(11, 16) }}</div>
      <client-only>
        <NuxtLink
            :to="`http://admin.infomania.ru/billboard/update/${event.id}`"
            class="slider__update"
            v-if="generalStore.token"
        >
          <font-awesome-icon v-if="generalStore.token" icon="fa-solid fa-gear" />
        </NuxtLink>
      </client-only>
    </div>
    <div class='event__day'>
      <div class='month'>{{ dayjs(event.eventDate).format('MMM') }}</div>
      <div class='day-name'>({{ dayjs(event.eventDate).format('dd') }})</div>
    </div>
    <div class='event__text'>
      <div class='title' v-html='event.title' />
      <el-scrollbar height='250px'>
        <div class='desc' v-html='event.desc' />
        <div class='event__info'>
          <div class='phone'>{{ event.phone }}</div>
          <div class='place' v-text='placeName[event.eventPlace]' />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.event {
  width: 100%;
  display: flex;
  &__date {
    text-align: center;
    width: 6%;
    padding: 10px;
    .day {
      font-size: 3rem;
      font-weight: bold;
    }
    .time {
      text-align: center;
    }
  }
  &__day {
    text-align: center;
    width: 6%;
    padding-top: 25px;
  }

  &__text {
    width: 80%;
    padding: 10px;
    text-align: justify;
    font-size: 18px;
    .title {
      font-size: 24px;
      padding-bottom: 10px;
      font-weight: bold;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-self: end;
    padding-top: 10px;
    .phone {
      align-self: end;
    }
    .place {
      align-self: end;
    }
  }
}
</style>