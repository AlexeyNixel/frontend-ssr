import type { ImageType, MetaType } from '~/shared/types/base';

export interface BookModel {
  id: string;
  desc: string;
  content: string;
  category: string;
  createdAt: string;
  dateOfReceipt: string;
  fileId: string;
  isDeleted: boolean;
  link: string;
  oldId: number;
  preview: ImageType;
  storagePlace: string;
  title: string;
}

export interface BookResponseModel {
  data: BookModel[];
  meta: MetaType;
}
