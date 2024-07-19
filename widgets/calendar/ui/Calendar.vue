<script setup lang="ts">
import { useBillboardStore } from '~/entities/billboard';
import dayjs from 'dayjs';

const billboardStore = useBillboardStore();
const eventsOnCalendar = ref<any>([]);

onMounted(() => {
  fetchEventsCurrentMonth(dayjs(new Date()).format());
  fetchEventByDay();
});

const generateEventsCalendar = (month: number) => {
  eventsOnCalendar.value = [
    {
      key: 'off',
      highlight: {
        color: 'orange',
      },
      dates: {
        repeat: {
          weekdays: 6 <= month && month < 9 ? 1 : 2,
        },
      },
      popover: {
        label: 'Выходной',
      },
    },
  ];

  if (billboardStore.billboards) {
    billboardStore.billboards.forEach((item) => {
      eventsOnCalendar.value.push({
        key: item.id,
        highlight: true,
        dates: dayjs(item.eventDate).format('YYYY-MM-DD'),
        popover: {
          label: item.eventTime.slice(-13, -8) + ' ' + item.title,
        },
      });
    });
  }
};

const handleSwapMonth = (val: any) => {
  const date = val[0].id;
  fetchEventsCurrentMonth(date);
};

const fetchEventsCurrentMonth = async (date: string) => {
  const startDay = dayjs(date).startOf('month').format();
  const endDay = dayjs(date).endOf('month').format();

  await billboardStore.getBillboards({
    fromDate: startDay,
    toDate: endDay,
    pageSize: 100,
  });

  generateEventsCalendar(+dayjs(date).format('M'));
};

const fetchEventByDay = async (val?: any) => {
  const day = dayjs(val ? val.id : new Date()).format('YYYY-MM-DD');
  await billboardStore.getBillboardByDay(day);
};
</script>

<template>
  <client-only>
    <div>
      <VCalendar
        class="calendar"
        :is-dark="{ selector: 'html', darkClass: 'dark' }"
        :attributes="eventsOnCalendar"
        transparent
        borderless
        expanded
        @did-move="handleSwapMonth"
        @dayclick="fetchEventByDay"
      />
    </div>
  </client-only>
</template>

<style scoped lang="scss">
.calendar {
  @apply w-full;
}

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

:deep(.vc-expanded) {
  @apply min-w-full sm:min-w-[360px];
}
</style>
