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

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Modules
export const modules = mysqlTable("modules", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  teacher: varchar("teacher", { length: 255 }).notNull(),
  duration: varchar("duration", { length: 64 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  level: mysqlEnum("level", ["iniciante", "intermediario", "avancado"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Module = typeof modules.$inferSelect;
export type InsertModule = typeof modules.$inferInsert;

// Students
export const students = mysqlTable("students", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  firstName: varchar("firstName", { length: 255 }),
  lastName: varchar("lastName", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  city: varchar("city", { length: 255 }),
  state: varchar("state", { length: 2 }),
  bio: text("bio"),
  experience: varchar("experience", { length: 255 }),
  specialty: varchar("specialty", { length: 255 }),
  mainLanguage: varchar("mainLanguage", { length: 64 }),
  portfolioUrl: text("portfolioUrl"),
  moduleId: int("moduleId"),
  enrollmentDate: timestamp("enrollmentDate").defaultNow(),
  status: mysqlEnum("status", ["active", "inactive", "completed"]).default("active"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Student = typeof students.$inferSelect;
export type InsertStudent = typeof students.$inferInsert;

// Classes
export const classes = mysqlTable("classes", {
  id: int("id").autoincrement().primaryKey(),
  moduleId: int("moduleId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  videoUrl: text("videoUrl"),
  materials: text("materials"),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Class = typeof classes.$inferSelect;
export type InsertClass = typeof classes.$inferInsert;

// Takes (gravações de áudio)
export const takes = mysqlTable("takes", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  classId: int("classId").notNull(),
  characterName: varchar("characterName", { length: 255 }).notNull(),
  audioUrl: text("audioUrl").notNull(),
  duration: int("duration"),
  qualityScore: int("qualityScore"),
  status: mysqlEnum("status", ["draft", "submitted", "approved", "rejected"]).default("draft"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  uploadedAt: timestamp("uploadedAt"),
});

export type Take = typeof takes.$inferSelect;
export type InsertTake = typeof takes.$inferInsert;

// Banners
export const banners = mysqlTable("banners", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  imageUrl: text("imageUrl").notNull(),
  linkUrl: text("linkUrl"),
  isPromo: int("isPromo").default(0),
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Banner = typeof banners.$inferSelect;
export type InsertBanner = typeof banners.$inferInsert;

// Notifications
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: varchar("type", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }),
  message: text("message"),
  relatedId: int("relatedId"),
  isRead: int("isRead").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
