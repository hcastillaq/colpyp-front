import { and, asc, eq, like } from 'drizzle-orm';
import { db } from '../db';
import {
  CityTable,
  RestrictionTable,
  RestrictionVehicleTable,
  VehicleTable,
} from '../db/drizzle/schema';

export const CityService = {
  getCityNames: async () => {
    const allCity = await db.select().from(CityTable);
    const cityNames = allCity.map((city) => String(city.name).toLowerCase());
    return cityNames as string[];
  },

  getByName: async (name: string) => {
    const city = await db
      .select()
      .from(CityTable)
      .where(eq(CityTable.name, name))
      .limit(1)
      .then((cities) => cities[0]);

    if (!city) {
      return null;
    }

    return city;
  },

  getRestrictionByDate: async (name: string, date: string) => {
    const city = await db
      .select()
      .from(CityTable)
      .where(eq(CityTable.name, name))
      .limit(1)
      .then((cities) => cities[0]);

    if (!city) {
      return [];
    }

    const restrictions = await db
      .select()
      .from(RestrictionTable)
      .leftJoin(
        RestrictionVehicleTable,
        eq(RestrictionTable.id, RestrictionVehicleTable.restriction_id),
      )
      .leftJoin(
        VehicleTable,
        eq(RestrictionVehicleTable.vehicle_id, VehicleTable.id),
      )
      .where(
        and(
          eq(RestrictionTable.city_id, city.id),
          like(RestrictionTable.date, `%${date}%`),
        ),
      )
      .orderBy(asc(RestrictionTable.date));

    const parseRestrictions = restrictions.map((restriction) => {
      return {
        date: restriction.restrictions_restriction.date,
        vehicle: restriction.vehicles_vehicle!.name,
        information: restriction.restrictions_restrictionvehicle!.information,
        plates: restriction.restrictions_restrictionvehicle!.plates,
      };
    });

    return parseRestrictions;
  },
};
