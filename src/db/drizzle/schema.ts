import { relations } from 'drizzle-orm';
import {
  date,
  int,
  longtext,
  mysqlTable,
  varchar,
} from 'drizzle-orm/mysql-core';

export const CityTable = mysqlTable('cities_city', {
  id: int().primaryKey().autoincrement(),
  name: varchar('name', { length: 200 }).unique().notNull(),
  information: longtext('information'),
});

export const RestrictionTable = mysqlTable('restrictions_restriction', {
  id: int('id').primaryKey().autoincrement(),
  date: date('date').notNull(),
  city_id: int('city_id')
    .notNull()
    .references(() => CityTable.id),
});

export const VehicleTable = mysqlTable('vehicles_vehicle', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 200 }).unique().notNull(),
});

export const RestrictionVehicleTable = mysqlTable(
  'restrictions_restrictionvehicle',
  {
    id: int('id').primaryKey().autoincrement(),
    information: varchar('information', { length: 200 }),
    plates: varchar('plates', { length: 200 }),
    restriction_id: int('restriction_id')
      .notNull()
      .references(() => RestrictionTable.id),
    vehicle_id: int('vehicle_id')
      .notNull()
      .references(() => VehicleTable.id),
  },
);

// Definir relaciones
export const CityRelations = relations(CityTable, ({ many }) => ({
  restrictions: many(RestrictionTable),
}));

export const RestrictionRelations = relations(
  RestrictionTable,
  ({ one, many }) => ({
    city: one(CityTable, {
      fields: [RestrictionTable.city_id],
      references: [CityTable.id],
    }),
    restrictionVehicles: many(RestrictionVehicleTable),
  }),
);

export const VehicleRelations = relations(VehicleTable, ({ many }) => ({
  restrictionVehicles: many(RestrictionVehicleTable),
}));

export const RestrictionVehicleRelations = relations(
  RestrictionVehicleTable,
  ({ one }) => ({
    restriction: one(RestrictionTable, {
      fields: [RestrictionVehicleTable.restriction_id],
      references: [RestrictionTable.id],
    }),
    vehicle: one(VehicleTable, {
      fields: [RestrictionVehicleTable.vehicle_id],
      references: [VehicleTable.id],
    }),
  }),
);
