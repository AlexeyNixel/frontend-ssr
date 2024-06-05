<script setup lang="ts">
import { Calendar } from 'v-calendar';
import { useBillboardStore } from '~/stores/billboardStore';
import type { BillboardType } from '~/models/baseTypes';
import dayjs from 'dayjs';

const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);

const billboardStore = useBillboardStore();

const events = ref<BillboardType[]>();
const currentEvents = ref<BillboardType[]>();
const currentMonth = ref<number>(Number(dayjs(new Date()).format('M')));
const eventsOnCalendar = computed(() => {
  let tempEvents: any = [
    {
      key: 'off',
      highlight: {
        color: 'orange',
      },
      dates: {
        repeat: {
          weekdays: 6 <= currentMonth.value && currentMonth.value < 9 ? 1 : 2,
        },
      },
      popover: {
        label: 'Выходной',
      },
    },
  ];
  if (events.value?.length! > 0) {
    events.value?.forEach((item) => {
      tempEvents.push({
        key: item.id,
        highlight: true,
        dates: dayjs(item.eventDate).format('YYYY-MM-DD'),
        popover: {
          label: item.eventTime.slice(-13, -8) + ' ' + item.title,
        },
      });
    });
  }
  return tempEvents;
});

const fetchEventsByMonth = async (month: string) => {
  const startDay = dayjs(month).startOf('month').format();
  const endDay = dayjs(month).endOf('month').format();
  events.value = await billboardStore.getBillboards({
    fromDate: startDay,
    toDate: endDay,
    pageSize: 100,
  });
};

const fetchEventByDay = async (day?: any) => {
  const currentDate = day ? day.date : new Date();

  currentEvents.value = await billboardStore.getBillboards({
    fromDate: dayjs(currentDate).format('YYYY-MM-DD') + 'T00:00:00.000Z',
    toDate: dayjs(currentDate).format('YYYY-MM-DD') + 'T00:00:00.000Z',
    orderBy: 'eventTime',
  });

  emits('update:modelValue', currentEvents.value);
};

const handleSwapMonth = async (value: any) => {
  currentMonth.value = value[0].month;
  const date = value[0].id;
  await fetchEventsByMonth(date);
};

await fetchEventsByMonth(dayjs(new Date()).format());
await fetchEventByDay();
</script>

<template>
  <div>
    <client-only>
      <Calendar
        :attributes="eventsOnCalendar"
        @did-move="handleSwapMonth"
        @dayclick="fetchEventByDay"
        :is-dark="{ selector: 'html', darkClass: 'dark' }"
        transparent
        borderless
        expanded
      />
    </client-only>
  </div>
</template>

<style scoped lang="scss">
:deep(.vc-container) {
  --vc-text-sm: 18px;
}
:deep(.vc-highlight) {
  width: 30px;
}
:deep(.vc-day) {
  min-height: 40px;
}

:deep(.vc-monthly .is-not-in-month *) {
  @apply opacity-[0.2] text-black dark:text-white font-normal;
}
</style>
