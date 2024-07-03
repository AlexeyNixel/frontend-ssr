export interface CollectionModel {
  id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  fileId: string;
  createdAt: string;
}

export interface CollectionParams {
  include: string;
}
