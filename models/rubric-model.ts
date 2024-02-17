import { EntryType } from 'models/entry-model';

export type RubricType = {
  id: string;
  oldId: string;
  title: string;
  desc: string;
  slug: string;
  isDeleted: boolean;
  entries?: EntryType[];
};
