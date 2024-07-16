export type ParamsType = {
  fromDate?: string;
  toDate?: string;
  pageSize?: number;
  orderBy?: string;
  search?: string;
  page?: number;
  include?: string;
  includes?: string;
  searchByField?: string;
  type?: string;
  model?: string;
  isDeleted?: boolean;
  genres?: any;
  isVideo?: boolean;
};

export type ImageType = {
  path: string;
  type: string;
  originalName: string;
};

export type MetaType = {
  page: number;
  pageSize: number;
  total: number;
  pages?: number;
};
