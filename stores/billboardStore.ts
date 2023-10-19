import { defineStore } from 'pinia';
import { BillboardType, ParamsType } from '~/models/baseTypes';
import { findBillboards } from '~/api/billboardApi';

export const useBillboardStore = defineStore('billboard', () => {
  const billboards = ref<BillboardType[]>();
  const getBillboards = async (params?: ParamsType) => {
    const { data } = await findBillboards(params);
    billboards.value = data;
    return data.data;
  };

  return {
    billboards,
    getBillboards,
  }
});