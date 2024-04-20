import type { MetaType, PreviewType } from '~/models/common';
import type { DepartmentType } from '~/models/department-model';

export type EntryType = {
  id: string;
  oldId: number;
  fileId: string;
  createdAt: string;
  publishedAt: string;
  title: string;
  desc: string;
  content: string;
  slug: string;
  published: boolean;
  isDeleted: boolean;
  departmentId: string;
  pinned: boolean;
  department: DepartmentType;
  preview: PreviewType;
};

export type EntryResponseType = {
  data: EntryType[];
  meta: MetaType;
};

export type EntryQuery = {
  fromDate?: string;
  toDate?: string;
  searchByField?: string;
  isDeleted?: string;
  pageSize?: number;
  orderBy?: string;
  include?: string;
  search?: string;
  page?: number;
  rubric?: 'anonsy' | 'aktualnoe' | 'sobytiya';
  department?: string;
};
