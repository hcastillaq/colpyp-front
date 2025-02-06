import type { Restriction } from './restriction.interface';

export interface Calendar {
  month: string;
  dates: {
    date: string;
    restrictions: Omit<Restriction, 'date'>[];
  }[];
}
