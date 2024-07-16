import type { MetaType } from '~/shared/types/base';

export interface GameType {
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
}

export interface GameResponseType {
  data: GameType[];
  meta: MetaType;
}

export interface GenresType {
  tag: string;
  desc: string;
  value?: boolean;
}
