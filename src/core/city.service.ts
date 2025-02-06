import type { Calendar } from './calendar.interface';
import type { City } from './city.interface';
import type { Restriction } from './restriction.interface';

const api = import.meta.env.API;

export const CityService = {
  getCityNames: async () => {
    return fetch(`${api}/city-names`).then(async (res) => {
      if (res.status === 200) {
        const cities = await res.json();
        return cities as string[];
      } else {
        return [];
      }
    });
  },
  getByName: async (name: string) => {
    return fetch(`${api}/cities/${name}`).then(async (res) => {
      if (res.status === 200) {
        const city = await res.json();
        return city as City;
      } else {
        return null;
      }
    });
  },

  getRestrictions: async (name: string) => {
    return fetch(`${api}/cities/${name}/restrictions`).then(async (res) => {
      if (res.status === 200) {
        const restrictions = await res.json();
        return restrictions as Restriction[];
      } else {
        return [];
      }
    });
  },

  getRestrictionByDate: async (name: string, date: string) => {
    return fetch(`${api}/cities/${name}/restrictions/${date}`).then(
      async (res) => {
        if (res.status === 200) {
          const restriction = await res.json();
          return restriction as Restriction[];
        } else {
          return [];
        }
      },
    );
  },

  getCalendar: async (name: string) => {
    return fetch(`${api}/cities/${name}/calendar`).then(async (res) => {
      if (res.status === 200) {
        const calendar = await res.json();
        return calendar as Calendar[];
      } else {
        return [];
      }
    });
  },
};
