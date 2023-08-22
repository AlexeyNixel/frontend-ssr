<script setup lang='ts'>
import { useBillboardStore } from '~/stores/billboardStore';
import { BillboardType } from '~/models/baseTypes';
// import moment from 'moment';
const moment = require('moment')
moment.locale('ru')

const billboardStore = useBillboardStore();
const billboards = ref<BillboardType[]>();

const dateEvents = ref<string[]>([]);

const whatADay = (date:string) => {
  console.log(moment(date).locale('ru').format('dddd'));
  if (moment(date).locale('ru').format('dd') === 'пн') {
    console.log(123);
    return 'dayOff';
  }
  else if (dateEvents.value.includes(`${date}T00:00:00.000Z`)) return 'eventDay'
  else return 'regularDay'
}

const fetchData = async () => {
  const { data } = await billboardStore.getBillboards();
  billboards.value = data;
  billboards.value?.forEach((item) => {
    dateEvents.value.push(item.eventDate);
  });
  console.log(dateEvents.value);
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


:deep(.el-calendar-table .el-calendar-day) {
  padding: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-calendar-table td) {
  padding: 0;
  margin-bottom: 0;
  height: 100%;
  width: 100%;
}

:deep(.el-calendar__body) {
  padding: 0 0 20px 0;
}
</style>