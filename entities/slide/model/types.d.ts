import { type EntryType } from '~/entities/entry';
import type { ImageType } from '~/shared/types/base';

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
