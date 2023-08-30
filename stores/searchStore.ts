import { defineStore } from 'pinia';
import dayjs from 'dayjs';

export const useSearchStore = defineStore('search', () => {
  const orderByFilter = ref<string>('-publishedAt')
  const yearFilter = ref<string>('')
  const departmentFilter = ref<string>()

  const clearFilter = () => {
    orderByFilter.value = ''
    yearFilter.value = ''
    departmentFilter.value = ''
  }

  const generateDate = () => {
    let years = []
    for(let i=2010; i<=Number(dayjs(new Date).format('YYYY')); i++) {
      years.push(i)
    }
    return years
  }

  return {
    orderByFilter,
    yearFilter,
    departmentFilter,
    clearFilter,
    generateDate,

  }
})