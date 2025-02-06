import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { CityService } from '../core/city.service';

export const server = {
  getCityRestrictions: defineAction({
    input: z.string(),
    handler: async (input) => {
      return await CityService.getRestrictions(input);
    },
  }),
};
