export type EntryResponseType = {
  data: EntryType[];
  meta: MetaType;
};

export type DocumentResponseType = {
  data: DocumentType[];
  meta: MetaType;
};

export type GameType = {
  comment: string;
  cover_file: string;
  full_description: string;
  game_duration: string;
  game_year: number;
  genres: string;
  id: string;
  name: string;
  place: string;
  player_age: number;
  player_max: number;
  player_min: number;
  rules_file: string;
  short_description: string;
  status: number;
  status_desc: string;
};

export type BillboardType = {
  id: string;
  oldId: number;
  eventDate: string;
  eventTime: string;
  title: string;
  desc: string;
  eventPlace: string;
  phone: string;
  slug: string;
  entryId: string;
  isDeleted: boolean;
};

export type DocumentType = {
  id: string;
  oldId: number;
  title: string;
  content: string;
  menuItemId: string;
  fileId: string;
  isDeleted: boolean;
  publishedAt: string;
};

export type DepartmentType = {
  id: string;
  title: string;
  desc: string;
  slug: string;
  preview: {
    path: string;
  };
  isDeleted: boolean;
};

export type EntryType = {
  id: string;
  oldId: number;
  fileId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  desc: string;
  content: string;
  slug: string;
  published: string;
  departmentId: string;
  department: DepartmentType;
  rubrics: any;
  rubric: RubricType;
  preview: {
    path: string;
  };
  isDeleted: boolean;
  isActive: boolean;
};

export type RubricType = {
  id: string;
  title: string;
  slug: string;
  entries: EntryType;
};

export type SliderType = {
  id: string;
  title: string;
  desc: string;
  entryId: string;
  fileId: string;
  image: ImageType;
  entry: EntryType;
  url: string;
  isDeleted: boolean;
  createdAt: string;
};

export type ImageType = {
  path: string;
  type: string;
  originalName: string;
};

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
  genres: any;
};

export type MetaType = {
  page: number;
  pages: number;
  pageSize: number;
};

export type MenuItemType = {
  id: string;
  oldId: number;
  title: string;
  menuId: string;
  menuItemType: string;
  slug: string;
  link: string;
  document: DocumentType;
};

export type MenuType = {
  id: string;
  oldId: number;
  title: string;
  menuType: string;
  menuItems: MenuItemType[];
};
