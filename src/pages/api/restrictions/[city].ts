export const prerender = false;

import type { APIRoute } from 'astro';
import { CityService } from '../../../core/city.service';

export const GET: APIRoute = async ({ params, request }) => {
  const { city } = params;
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthTwoDigits = (currentMonth + 1).toString().padStart(2, '0');
  const findDate = `${currentYear}-${monthTwoDigits}`;
  const restrictions = await CityService.getRestrictionByDate(city!, findDate);

  return new Response(JSON.stringify(restrictions), {
    status: 200,
  });
};
