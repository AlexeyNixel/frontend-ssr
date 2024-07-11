import type { DepartmentType } from '~/models/department-model';
import type { MetaType, PreviewType } from '~/models/common';

export interface EntryType {
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
}

export type EntryResponseType = {
  data: EntryType[];
  meta: MetaType;
};
