import { MetaType, PreviewType } from '~/models/common';

export interface DepartmentType {
  id: string;
  oldId: number;
  fileId: string;
  title: string;
  slug: string;
  isDeleted: boolean;
  entries: string;
  preview: PreviewType;
}

export type DepartmentResponseType = {
  data: DepartmentType[];
  meta: MetaType;
};
