<script setup lang="ts">
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';
import dayjs from 'dayjs';
import type { BillboardType } from '~/models/baseTypes';
import { useBillboardStore } from '~/stores/billboardStore';

const billboardStore = useBillboardStore();

const selectEvent = ref<BillboardType[]>([]);
const events = ref<BillboardType[]>([]);
const fromDate = dayjs(new Date()).startOf('month').format('YYYY-MM-DD');
const toDate = dayjs(new Date()).endOf('month').format('YYYY-MM-DD');
const isLoading = ref<boolean>(false);
const isOffDay = ref<boolean>(false);
const selectedDay = ref('');

const ui = {
  base: 'animate-pulse',
  background: 'bg-gray-300 dark:bg-gray-800',
};

const calendarMove = async (val: any) => {
  const startDay = dayjs(val[0].monthComps.firstDayOfMonth).format(
    'YYYY-MM-DD'
  );
  const endDay = dayjs(val[0].monthComps.firstDayOfMonth)
    .endOf('month')
    .format('YYYY-MM-DD');
  if (fromDate === startDay) return;
  await handleFetchData(startDay, endDay);
};

const attrs = ref<any>([
  {
    key: 'off',
    highlight: {
      color: 'orange',
    },
    //@ts-ignore
    dates: { repeat: { weekdays: 1 } },
    popover: {
      label: 'Выходной',
    },
  },
]);

const handleSelectDay = async (date?: any) => {
  isOffDay.value = date?.attributes[0]?.key === 'off';

  selectedDay.value = dayjs(date?.date || new Date()).format('YYYY-MM-DD');
  if (dayjs(selectedDay.value).format('dd') === 'пн') {
    isOffDay.value = true;
  }
  selectEvent.value = await billboardStore.getBillboards({
    fromDate: selectedDay.value + 'T00:00:00.000Z',
    toDate: selectedDay.value + 'T00:00:00.000Z',
    orderBy: 'eventTime',
  });
};

const handleFetchData = async (fromDate: string, toDate: string) => {
  events.value = await billboardStore.getBillboards({
    fromDate: fromDate + 'T00:00:00.000Z',
    toDate: toDate + 'T00:00:00.000Z',
    pageSize: 50,
    orderBy: '-eventTime',
  });

  events.value.forEach((event) => {
    //@ts-ignore
    attrs.value.push({
      key: event.id,
      highlight: {
        color: 'blue',
      },
      dates: dayjs(event.eventDate).format('YYYY-MM-DD'),
      popover: {
        label: event.title,
      },
    });
  });
};

await handleFetchData(fromDate, toDate);
await handleSelectDay();

onMounted(() => {
  isLoading.value = true;
});
</script>

<template>
  <USkeleton :ui="ui" v-if="!isLoading" class="h-[370px] my-4 rounded-[10px]" />
  <div class="my-4 bg-white dark:bg-neutral-900 rounded-[10px]" v-else>
    <div class="text-xl font-bold mx-4 py-3">Афиша</div>
    <div class="flex">
      <div class="lg:w-[35%] xl:w-[30%] w-full">
        <Calendar
          :is-dark="{ selector: 'html', darkClass: 'dark' }"
          transparent
          borderless
          expanded
          :attributes="attrs"
          @dayclick="handleSelectDay"
          @did-move="calendarMove"
        >
        </Calendar>
      </div>
      <div class="lg:block lg:w-[65%] xl:w-[70%] flex">
        <ui-event-list
          :events="selectEvent"
          :day="selectedDay"
          v-if="selectEvent.length > 0"
        />
        <div class="h-full m-auto" v-else>
          <ui-off-day
            class="w-full h-full flex flex-col justify-center items-center"
            v-if="isOffDay"
          ></ui-off-day>
          <div
            v-else
            class="w-full h-full flex flex-col justify-center items-center"
          >
            <img class="w-3/12" src="/books.svg" alt="" />
            <h2 class="text-xl my-2 font-bold">Сегодня можете взять книги</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.vc-container) {
  --vc-text-sm: 18px;
  // height: 320px;
}
:deep(.vc-highlight) {
  width: 30px;
  // height: 30px;
}
:deep(.vc-day) {
  min-height: 40px;
}

:deep(.vc-monthly .is-not-in-month *) {
  opacity: 0.2;
}
</style>
