import { defineStore } from 'pinia';
import {
  type BillboardType,
  findBillboard,
  findBillboards,
} from '~/entities/billboard';
import type { ParamsType } from '~/shared/types/base';

export const useBillboardStore = defineStore('billboards', () => {
  const billboards = ref<BillboardType[]>();
  const billboard = ref<BillboardType[]>([]);
  const selectedEvents = ref<BillboardType[]>();
  const activeComp = ref<'event' | 'calendar'>('calendar');

  const getBillboards = async (params?: ParamsType) => {
    billboards.value = await findBillboards(params);
    selectedEvents.value = billboards.value;
    return billboards.value;
  };

  const getBillboardByDay = async (day: string, params?: ParamsType) => {
    billboard.value = await findBillboards({
      fromDate: day + 'T00:00:00.000Z',
      toDate: day + 'T00:00:00.000Z',
      ...params,
    });
  };

  const getBillboard = async (slug: string) => {
    return await findBillboard(slug);
  };

  return {
    billboard,
    billboards,
    getBillboards,
    getBillboard,
    getBillboardByDay,
    activeComp,
    selectedEvents,
  };
});
