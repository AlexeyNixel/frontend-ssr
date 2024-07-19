import { defineStore } from 'pinia';
import type { EntryParams } from '~/entities/entry';
import dayjs from 'dayjs';

export const useFilterStore = defineStore('filter', () => {
  const route = useRoute();

  const orderFilters = ref([
    {
      name: 'По умолчанию',
      value: '',
    },
    {
      name: 'Сначала новые',
      value: '-publishedAt',
    },
    {
      name: 'Сначала старые',
      value: 'publishedAt',
    },
  ]);

  const filters = ref({
    orderFilter: (route.query.order as string) || '-publishedAt',
    year: route.query.year || '',
    department: (route.query.department as string) || '',
    rubric: (route.query.rubric as string) || '',
  });

  const clearFilter = () => {
    filters.value.orderFilter = '-publishedAt';
    filters.value.department = '';
    filters.value.year = '';
    filters.value.rubric = '';
  };

  const params = ref<EntryParams>({
    toDate: filters.value.year
      ? filters.value.year + '-12-31T00:00:00.000Z'
      : '',
    fromDate: filters.value.year
      ? filters.value.year + '-01-01T00:00:00.000Z'
      : '',
    orderBy: filters.value.orderFilter,
    include: 'preview',
  });

  const generateDate = () => {
    let years = [];
    for (let i = 2010; i <= Number(dayjs(new Date()).format('YYYY')); i++) {
      years.push(i);
    }
    return years;
  };

  return {
    generateDate,
    clearFilter,
    orderFilters,
    filters,
    params,
  };
});
