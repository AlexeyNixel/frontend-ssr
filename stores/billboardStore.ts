import { defineStore } from 'pinia';
import type { BillboardType, ParamsType } from '~/models/baseTypes';
import { findBillboard, findBillboards } from '~/api/billboardApi';

export const useBillboardStore = defineStore('billboard', () => {
  const billboards = ref<BillboardType[]>();

  const selectedEvents = ref<BillboardType[]>();
  const activeComp = ref<'event' | 'calendar'>('calendar');

  const getBillboards = async (params?: ParamsType) => {
    billboards.value = await findBillboards(params);
    selectedEvents.value = billboards.value;
    return billboards.value;
  };

  const getBillboard = async (slug: string) => {
    return await findBillboard(slug);
  };

  return {
    billboards,
    getBillboards,
    getBillboard,
    activeComp,
    selectedEvents,
  };
});
