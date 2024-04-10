<script setup lang="ts">
import { Calendar } from 'v-calendar';
import { storeToRefs } from 'pinia';
import { useBillboardStore } from '~/stores/billboardStore';
import type { BillboardType, ParamsType } from '~/models/baseTypes';
import dayjs from 'dayjs';

const billboardStore = useBillboardStore();
const billboards = ref<BillboardType[]>();
const selectEvents = ref<BillboardType[]>();
const { attrs } = storeToRefs(billboardStore);
const { activeComp } = storeToRefs(billboardStore);

const handleSelectDay = async (val: any) => {
  selectEvents.value = await fetchData(val.id, val.id);
  if (selectEvents.value && selectEvents.value?.length > 0) {
    activeComp.value = 'event';
  }
};

const fetchData = async (
  fromDate: string,
  toDate: string,
  params?: ParamsType
) => {
  billboards.value = await billboardStore.getBillboards({
    fromDate: fromDate + 'T00:00:00.000Z',
    toDate: toDate + 'T00:00:00.000Z',
    ...params,
  });
  return billboards.value;
};

const calendarMove = async (val: any) => {
  const startDay = dayjs(val[0].monthComps.firstDayOfMonth).format(
    'YYYY-MM-DD'
  );
  const endDay = dayjs(val[0].monthComps.firstDayOfMonth)
    .endOf('month')
    .format('YYYY-MM-DD');
  await fetchData(startDay, endDay, { pageSize: 50 });
  billboards.value?.forEach((item) => {
    attrs.value.push({
      key: item.id,
      highlight: true,
      dates: dayjs(item.eventDate).format('YYYY-MM-DD'),
    });
  });
};

await fetchData(
  dayjs(new Date()).startOf('month').format('YYYY-MM-DD'),
  dayjs(new Date()).endOf('month').format('YYYY-MM-DD'),
  {
    pageSize: 50,
  }
);

billboards.value?.forEach((item) => {
  attrs.value.push({
    key: item.id,
    highlight: true,
    dates: dayjs(item.eventDate).format('YYYY-MM-DD'),
  });
});
</script>

<template>
  <div>
    <Calendar
      :attributes="attrs"
      :is-dark="{ selector: 'html', darkClass: 'dark' }"
      @dayclick="handleSelectDay"
      @did-move="calendarMove"
      transparent
      borderless
      expanded
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.vc-header.is-lg) {
  //display: none;
}

:deep(.vc-container) {
  --vc-text-sm: 18px;
  // height: 320px;
}

:deep(.vc-highlight) {
  width: 30px;
  height: 30px;
}

:deep(.vc-day) {
  min-height: 50px;
}

:deep(.vc-monthly .is-not-in-month *) {
  opacity: 0.2;
}
</style>
