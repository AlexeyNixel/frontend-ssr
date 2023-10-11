import { defineStore } from 'pinia';
import { ParamsType } from '~/models/baseTypes';
import { findDepartments } from '~/api/departmentApi';

export const useDepartmentStore = defineStore('department', () => {
  const getDepartments = async (params?: ParamsType) => {
    const { data } = await findDepartments(params)
    return data
  }

  return {
    getDepartments
  }
})