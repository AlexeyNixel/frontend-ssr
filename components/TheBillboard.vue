<script setup lang='ts'>
import { useBillboardStore } from '~/stores/billboardStore';
import { BillboardType } from '~/models/baseTypes';
import dayjs from 'dayjs';
import type { CalendarDateType, CalendarInstance } from 'element-plus';
import moment from 'moment';
import TheEvent from '~/components/ui/TheEvent.vue';
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';

const billboardStore = useBillboardStore();
const billboards = ref<BillboardType[]>();


const currentEvent = ref<BillboardType[]>();
const dateEvents = ref<string[]>([]);

const calendar = ref<CalendarInstance>();
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return;
  calendar.value.selectDate(val);

  //@ts-ignore
  const fromDate = moment(calendar.value.selectedDay.$d)
    .startOf('month')
    .format('YYYY-MM-DD');
  //@ts-ignore
  const toDate = moment(calendar.value.selectedDay.$d)
    .endOf('month')
    .format('YYYY-MM-DD');
  fetchData(fromDate, toDate);
};

const whatADay = (date: string) => {
  if (dayjs(date).format('dd') === 'пн') return 'day-off';
  else if (dateEvents.value.includes(`${date}T00:00:00.000Z`)) {
    return 'event-day';
  } else return 'regular-day';
};

const handleEventCheck = async (date: string) => {
  const { data } = await billboardStore.getBillboards({
    searchByField: `eventDate=${date}T00:00:00.000Z`,
  });
  currentEvent.value = data;
};

const fetchData = async (fromDate: string, toDate: string) => {
  const { data } = await billboardStore.getBillboards({
    fromDate: fromDate + 'T00:00:00.000Z',
    toDate: toDate + 'T00:00:00.000Z',
    pageSize: 50,
    orderBy: '-eventDate',
  });

  billboards.value = data;
  billboards.value?.forEach((item) => {
    dateEvents.value.push(item.eventDate);
  });
};
const fromDate: string = moment(new Date())
  .startOf('month')
  .format('YYYY-MM-DD');
const toDate: string = moment(new Date()).endOf('month').format('YYYY-MM-DD');
fetchData(fromDate, toDate);

</script>

<template>
  <Calendar />
<!--  <div class='billboard'>-->
<!--    <div class='billboard__header'>Афиша</div>-->
<!--    <div class='billboard__container'>-->
<!--      <div class='billboard-calendar'>-->
<!--        <el-calendar ref='calendar'>-->
<!--          <template #header='{ date }'>-->
<!--            <div class='calendar-header'>-->
<!--              <el-button-->
<!--                class='calendar-header__btn'-->
<!--                @click="selectDate('prev-month')">-->
<!--                <client-only-->
<!--                >-->
<!--                  <font-awesome-icon :icon="['fas', 'chevron-left']"-->
<!--                  />-->
<!--                </client-only>-->
<!--              </el-button>-->
<!--              <div class='calendar-header__date'>{{ date }}</div>-->
<!--              <el-button-->
<!--                class='calendar-header__btn'-->
<!--                @click="selectDate('next-month')">-->
<!--                <client-only-->
<!--                >-->
<!--                  <font-awesome-icon :icon="['fas', 'chevron-right']"-->
<!--                  />-->
<!--                </client-only>-->
<!--              </el-button>-->
<!--            </div>-->
<!--          </template>-->
<!--          <template #date-cell='{data}'>-->
<!--            <div-->
<!--              class='day event-day'-->
<!--              v-if="whatADay(data.day) === 'event-day'"-->
<!--              @click='handleEventCheck(data.day)'>-->
<!--              {{ data.day.slice(-2) }}-->
<!--            </div>-->
<!--            <div-->
<!--              class='day day-off'-->
<!--              v-if="whatADay(data.day) === 'day-off'">-->
<!--              {{ data.day.slice(-2) }}-->
<!--            </div>-->
<!--            <div-->
<!--              class='day regular-day'-->
<!--              v-if="whatADay(data.day) === 'regular-day'">-->
<!--              {{ data.day.slice(-2) }}-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-calendar>-->
<!--      </div>-->
<!--      <div class='billboard-content'>-->
<!--        <el-carousel-->
<!--          class='event'-->
<!--          trigger='click'-->
<!--          height='330px'-->
<!--          v-if='currentEvent'-->
<!--        >-->
<!--          <el-carousel-item-->
<!--            class='event__item'-->
<!--            v-for='item in currentEvent'-->
<!--            :key='item'-->
<!--          >-->
<!--            <the-event :event='item'/>-->
<!--          </el-carousel-item>-->
<!--        </el-carousel>-->
<!--        <div class='empty-day' v-else>-->
<!--          <img src='/books.svg' alt='' />-->
<!--          <p class='empty-day__title'>Сегодня можете взять книги</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

</template>

<style scoped lang='scss'>
.calendar-header {
  width: 100%;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;

  &__btn {
    border-radius: 30px;
    width: 30px;
    height: 30px;
  }
}

.billboard {
  background: var(--el-bg-color);
  border-radius: 10px;

  margin: 1vh 0;

  &__header {
    display: flex;
    align-items: center;
    padding: 20px 20px 0 20px;
    font-weight: bold;
    font-size: 1.4rem;
  }
}

.billboard__container {
  display: flex;

  .billboard-calendar {
    width: 30%;
  }

  .billboard-content {
    width: 70%;
  }
}

.event {
  &__item {
    display: flex;
    width: 100%;
  }
}

.empty-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  img {
    width: 10vw;
  }

  &__title {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 1vh 0;
  }
}

.day {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0.5vw;
  width: 100%;
  height: 100%;
  margin: 1px;
}

.day-off {
  border: 2px solid orangered;
}

.event-day {
  border: 2px solid #1d5deb;
}

:deep(.el-calendar) {
  padding: 20px;
  border-radius: 0 0 0 10px;
}
:deep(.el-calendar__header) {
  border: none;
  padding: 0;
}
:deep(.el-calendar__body) {
  padding: 0;
}
:deep(.el-calendar-table td) {
  border: none;
}
:deep(.el-calendar-table .el-calendar-day) {
  padding: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.el-calendar-table tr td:first-child) {
  border: none;
}
:deep(.el-calendar-table tr:first-child td) {
  border: none;
}
:deep(.el-calendar-table:not(.is-range) td.prev) {
  border: none;
}
</style>
