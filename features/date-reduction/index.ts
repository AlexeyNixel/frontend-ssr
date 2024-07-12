import dayjs from 'dayjs';

export const dateReduction = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY');
};
