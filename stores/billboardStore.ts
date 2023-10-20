import { defineStore } from 'pinia';
import { BillboardType, ParamsType } from '~/models/baseTypes';
import { findBillboards } from '~/api/billboardApi';
import { AttributeConfig } from 'v-calendar/src/utils/attribute';

export const useBillboardStore = defineStore('billboard', () => {
  const billboards = ref<BillboardType[]>();
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
  const selectedEvents = ref<BillboardType[]>()
  const activeComp = ref<'event' | 'calendar'>('calendar');

  const getBillboards = async (params?: ParamsType) => {
    billboards.value = await findBillboards(params);
    selectedEvents.value = billboards.value
    return billboards.value;
  };

  return {
    attrs,
    billboards,
    getBillboards,
    activeComp,
    selectedEvents
  };
});