export const prerender = false;

import type { APIRoute } from 'astro';
import { CityService } from '../../../core/city.service';

export const GET: APIRoute = async ({ params, request }) => {
  const { city } = params;
  const restrictions = await CityService.getCalendar(city!);

  return new Response(JSON.stringify(restrictions), {
    status: 200,
  });
};
