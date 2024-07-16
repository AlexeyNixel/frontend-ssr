import type { ImageType, MetaType } from '~/shared/types/base';

export interface DepartmentType {
  id: string;
  oldId: number;
  fileId: string;
  title: string;
  slug: string;
  isDeleted: boolean;
  entries: string;
  preview: ImageType;
}

export type DepartmentResponseType = {
  data: DepartmentType[];
  meta: MetaType;
};
