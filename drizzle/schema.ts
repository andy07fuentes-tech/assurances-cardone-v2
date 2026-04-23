import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const carQuoteSubmissions = mysqlTable("carQuoteSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  locale: varchar("locale", { length: 8 }).notNull(),
  fullName: varchar("fullName", { length: 160 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  city: varchar("city", { length: 120 }),
  postalCode: varchar("postalCode", { length: 12 }).notNull(),
  validatedAddress: text("validatedAddress"),
  driverAge: int("driverAge").notNull(),
  accidentCount: int("accidentCount").default(0).notNull(),
  ticketCount: int("ticketCount").default(0).notNull(),
  priorInsurance: varchar("priorInsurance", { length: 24 }).notNull(),
  historyNotes: text("historyNotes"),
  vehicleYear: int("vehicleYear").notNull(),
  vehicleMake: varchar("vehicleMake", { length: 120 }).notNull(),
  vehicleModel: varchar("vehicleModel", { length: 160 }).notNull(),
  estimatedAnnualPremium: int("estimatedAnnualPremium").notNull(),
  estimatedMonthlyPremium: int("estimatedMonthlyPremium").notNull(),
  manualReview: int("manualReview").default(0).notNull(),
  source: varchar("source", { length: 80 }).default("website").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type CarQuoteSubmission = typeof carQuoteSubmissions.$inferSelect;
export type InsertCarQuoteSubmission = typeof carQuoteSubmissions.$inferInsert;
