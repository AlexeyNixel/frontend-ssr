import { defineStore } from 'pinia';
import type { DepartmentType, ParamsType } from '~/models/baseTypes';
import { findDepartments } from '~/api/departmentApi';

export const useDepartmentStore = defineStore('department', () => {
  const departments = ref<DepartmentType[]>();
  const getDepartments = async (params?: ParamsType) => {
    const { data } = await findDepartments(params);
    departments.value = data;
    return data;
  };

  return {
    departments,
    getDepartments,
  };
});
