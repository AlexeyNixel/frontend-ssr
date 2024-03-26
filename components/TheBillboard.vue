<script setup lang="ts">
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';
import { AttributeConfig } from 'v-calendar/src/utils/attribute';
import dayjs from 'dayjs';
import { BillboardType } from '~/models/baseTypes';
import { useBillboardStore } from '~/stores/billboardStore';
import { CalendarDay } from 'v-calendar/src/utils/page';
import TheEvent from '~/components/ui/TheEvent.vue';

const billboardStore = useBillboardStore();

const selectEvent = ref<BillboardType[]>([]);
const events = ref<BillboardType[]>([]);
const fromDate = dayjs(new Date()).startOf('month').format('YYYY-MM-DD');
const toDate = dayjs(new Date()).endOf('month').format('YYYY-MM-DD');
const isLoading = ref<boolean>(false);
const isOffDay = ref<boolean>(false);

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

const attrs = ref<AttributeConfig[]>([
  {
    key: 'off',
    highlight: {
      color: 'orange',
    },
    dot: 'orange',
    //@ts-ignore
    dates: { repeat: { weekdays: 2 } },
    popover: {
      label: 'Выходной',
    },
  },
]);

const handleSelectDay = async (date?: CalendarDay) => {
  if (date?.attributes[0]?.key === 'off') {
    isOffDay.value = true;
    console.log(isOffDay.value);
  } else {
    isOffDay.value = false;
  }
  const day = dayjs(date?.date || new Date()).format('YYYY-MM-DD');
  selectEvent.value = await billboardStore.getBillboards({
    fromDate: day + 'T00:00:00.000Z',
    toDate: day + 'T00:00:00.000Z',
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
      highlight: true,
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
  <USkeleton :ui="ui" v-if="!isLoading" class="h-[370px]" />
  <client-only v-else>
    <div class="my-4 bg-white dark:bg-neutral-900 rounded-[10px]">
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
        <div class="hidden lg:block lg:w-[65%] xl:w-[70%] flex h-full">
          <ui-event-list :events='selectEvent' v-if="selectEvent.length > 0"/>
          <div v-else>
            <ui-off-day
              class="w-full h-full flex flex-col justify-center items-center"
              v-if="isOffDay"
            ></ui-off-day>
            <div
              class="w-full h-full flex flex-col justify-center items-center"
              v-else
            >
              <img class="w-3/12" src="/books.svg" alt="" />
              <h2 class="text-xl my-2 font-bold">Сегодня можете взять книги</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
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
