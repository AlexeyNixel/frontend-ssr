import { defineStore } from 'pinia';
import { type DepartmentType } from './types';
import { findDepartments } from '~/entities/department/api';
import type { ParamsType } from '~/shared/types/base';

export const useDepartmentStore = defineStore('department', () => {
  const departments = ref<DepartmentType[]>();

  const getDepartments = async (params?: ParamsType) => {
    departments.value = await findDepartments(params);
  };

  return {
    departments,
    getDepartments,
  };
});
