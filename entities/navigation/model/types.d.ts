import { type DocumentType } from '~/entities/document';

export type MenuType = {
  id: string;
  oldId: number;
  title: string;
  menuType: string;
  menuItems: MenuItemType[];
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
