import type { ImageType } from '~/shared/types/base';

export interface CollectionModel {
  id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  fileId: string;
  createdAt: string;
  preview: ImageType;
}

export interface CollectionParams {
  include: string;
}
