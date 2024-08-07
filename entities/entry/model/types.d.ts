import type { DepartmentType } from '~/entities/department';
import type { ImageType, MetaType } from '~/shared/types/base';

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
  preview: ImageType;
}

export type EntryResponseType = {
  value: any;
  data: EntryType[];
  meta: MetaType;
};
