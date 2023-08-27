<script setup lang='ts'>
import { useBillboardStore } from '~/stores/billboardStore';
import { BillboardType } from '~/models/baseTypes';
import moment from 'moment';
import dayjs from 'dayjs';

const billboardStore = useBillboardStore();
const billboards = ref<BillboardType[]>();

const dateEvents = ref<string[]>([]);

const whatADay = (date:string) => {
  if (dayjs(date).format('dd') === 'пн') return 'day-off';
  else if (dateEvents.value.includes(`${date}T00:00:00.000Z`)) {
    return 'event-day';
  }
  else return 'regular-day'
}

const fetchData = async () => {
  const { data } = await billboardStore.getBillboards({
    pageSize:50,
    orderBy:'-eventDate'
  });
  billboards.value = data;
  billboards.value?.forEach((item) => {
    dateEvents.value.push(item.eventDate);
  });
};
fetchData()


</script>

<template>
  <div class='billboard'>
    <div class='billboard__header'>Афиша</div>
    <div class='billboard__container'>
      <div class='billboard-calendar'>
        <el-calendar>
          <template #header='{date}'>{{ date }}</template>
          <template #dateCell='dateCell'>
            <div
              :class='whatADay(dateCell.data.day)'
              class='day'
            >
              {{ dateCell.data.day.slice(-2) }}
            </div>

          </template>
        </el-calendar>
      </div>
      <div class='billboard-content'>asd</div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.billboard {
  background: var(--el-bg-color);
  border-radius: 10px;
  padding: 0 20px;
  margin: 1vh 0;

  &__header {
    display: flex;
    align-items: center;
    padding: 10px 0;
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
    padding-bottom: 20px;
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

:deep(.el-calendar__body) {
  padding: 0 0 20px 0;
}
:deep(.el-calendar__header) {
  //display: none;
}
:deep(.el-calendar-table td) {
  border: none;
}
:deep(.el-calendar-table .el-calendar-day) {
  padding: 0px;
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