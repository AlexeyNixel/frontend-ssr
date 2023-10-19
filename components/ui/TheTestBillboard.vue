<script setup lang='ts'>
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';
import { AttributeConfig } from 'v-calendar/src/utils/attribute';
import dayjs from 'dayjs';
import { BillboardType } from '~/models/baseTypes';
import { useBillboardStore } from '~/stores/billboardStore';
import { CalendarDay } from 'v-calendar/src/utils/page';
import TheEvent from '~/components/ui/TheEvent.vue';

const calendar = ref(null);

const calendarMove = async (val: any) => {
  const startDay = dayjs(val[0].monthComps.firstDayOfMonth).format('YYYY-MM-DD');
  const endDay = dayjs(val[0].monthComps.firstDayOfMonth).endOf('month').format('YYYY-MM-DD');
  if (fromDate === startDay) return;
  await handleFetchData(startDay, endDay );
};


const fromDate = dayjs(new Date()).startOf('month').format('YYYY-MM-DD');
const toDate = dayjs(new Date()).endOf('month').format('YYYY-MM-DD');

const selectEvent = ref<BillboardType[]>();
const billboardStore = useBillboardStore();
const events = ref<BillboardType[]>();
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

const handleSelectDay = async (date: CalendarDay) => {
  const day = dayjs(date.date).format('YYYY-MM-DD');
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
  events.value?.forEach((event) => {
    //@ts-ignore
    attrs.value.push({
      key: event.id,
      highlight: true,
      dates: dayjs(event.eventDate).format('YYYY-MM-DD'),
    });
  });
};

handleFetchData(fromDate, toDate);
</script>

<template>
  <div class='billboard'>
    <div class='billboard__header'>Афиша</div>
    <el-row class='billboard__main'>
      <el-col :xs='10' :sm='8' :md='8' :lg='8' :xl='6'>
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
      <el-col :xs='14' :sm='16' :md='16' :lg='16' :xl='18'>
        <Swiper class='event'>
          <SwiperSlide class='event__item' v-for='item in selectEvent' :key='item'>
            <the-event :event='item' />
          </SwiperSlide>
        </Swiper>
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

  &__header {
    font-size: 1.3rem;
    font-weight: bold;
  }

  &__main {
    width: 100%;
    display: flex;
    min-height: 400px;
  }

  &__calendar {
    min-width: 25%;
  }

  &__content {
    width: 75%;
  }
}

.event {
  //width: 100%;
  height: 95%;

  &__item {
    width: 100%;
    //background: #007BFF;
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
</style>