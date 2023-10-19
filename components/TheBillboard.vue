<script setup lang='ts'>
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';
import { AttributeConfig } from 'v-calendar/src/utils/attribute';
import dayjs from 'dayjs';
import { BillboardType } from '~/models/baseTypes';
import { useBillboardStore } from '~/stores/billboardStore';
import { CalendarDay } from 'v-calendar/src/utils/page';
import TheEvent from '~/components/ui/TheEvent.vue';

const billboardStore = useBillboardStore();

const calendar = ref(null);
const selectEvent = ref<BillboardType[]>([]);
const events = ref<BillboardType[]>();
const fromDate = dayjs(new Date()).startOf('month').format('YYYY-MM-DD');
const toDate = dayjs(new Date()).endOf('month').format('YYYY-MM-DD');

const calendarMove = async (val: any) => {
  const startDay = dayjs(val[0].monthComps.firstDayOfMonth).format('YYYY-MM-DD');
  const endDay = dayjs(val[0].monthComps.firstDayOfMonth).endOf('month').format('YYYY-MM-DD');
  if (fromDate === startDay) return;
  await handleFetchData(startDay, endDay );
};

const attrs = ref<AttributeConfig[]>([
  {
    key: 'off',
    highlight: {
      color: 'orange',
    },
    //@ts-ignore
    dates: { repeat: { weekdays: 2 } },
    popover: {
      label: 'Выходной',
    },
  },
]);

const handleSelectDay = async (date?: CalendarDay) => {

  const day = dayjs(date?.date || new Date).format('YYYY-MM-DD');
  selectEvent.value = await billboardStore.getBillboards({
    fromDate: day + 'T00:00:00.000Z',
    toDate: day + 'T00:00:00.000Z',
  });
};

const handleFetchData = async (fromDate: string, toDate: string) => {
  events.value = await billboardStore.getBillboards({
    fromDate: fromDate + 'T00:00:00.000Z',
    toDate: toDate + 'T00:00:00.000Z',
    pageSize: 50,
    orderBy: '-eventDate',
  });
  console.log(events.value);
  events.value?.forEach((event) => {
    //@ts-ignore
    attrs.value.push({
      key: event.id,
      highlight: true,
      dates: dayjs(event.eventDate).format('YYYY-MM-DD'),
      popover: {
        label: event.title,
      },
    });
  });
};

await handleFetchData(fromDate, toDate);
await handleSelectDay()
</script>

<template>
  <div class='billboard'>
    <div class='billboard__header'>Афиша</div>
    <el-row class='billboard__main'>
      <el-col :xs='24' :sm='8' :md='8' :lg='8' :xl='6' class='billboard__calendar'>
        <Calendar
          :ref='calendar'
          :is-dark="{ selector: 'html', darkClass: 'dark' }"
          transparent
          borderless
          expanded
          class='calendar'
          :attributes='attrs'
          @dayclick='handleSelectDay'
          @did-move='calendarMove'
        >
        </Calendar>
      </el-col>
      <el-col :xs='14' :sm='16' :md='16' :lg='16' :xl='18' class='event__content'>
        <Swiper v-if='selectEvent.length > 0' class='event'>
          <SwiperSlide class='event__item' v-for='item in selectEvent' :key='item'>
            <the-event :event='item' />
          </SwiperSlide>
        </Swiper>
        <div class='empty-day' v-else>
          <img class='empty-day__img' src='/books.svg' alt=''>
          <h2>Сегодня можете взять книги</h2>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang='scss'>
.calendar {
  width: 600px;
  height: 600px;
}

.billboard {
  background: var(--el-bg-color);
  border-radius: 10px;
  padding: 10px;
  max-height: 500px;
  margin: 1vh 0;

  &__header {
    font-size: 1.3rem;
    font-weight: bold;
    padding: 0 10px;
  }

  &__main {
    width: 100%;
    display: flex;
    min-height: 400px;
  }
}

.event {
  height: 95%;

  &__item {
    width: 100%;
  }

}

.empty-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  &__img  {
    width: 300px;
  }
}

:deep(.vc-container) {
  --vc-text-sm: 18px;
  height: 320px;

}
:deep(.vc-highlight) {
  width: 30px;
  height: 30px;
}
:deep(.vc-day) {
  min-height: 55px;
}

@media (max-width: 767px) {
  .event__content {
    display: none;
  }
  .billboard__calendar {
    width: 100%;
  }
}
</style>