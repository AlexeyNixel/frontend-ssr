import type { ImageType } from '~/models/baseTypes';
import { type EntryType } from '~/entities/entry';

export interface SliderType {
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
}
