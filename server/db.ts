import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, modules, students, classes, takes, banners, notifications, Module, Student, Class, Take, Banner, Notification, InsertModule, InsertStudent, InsertClass, InsertTake, InsertBanner, InsertNotification } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Modules
export async function getModules(): Promise<Module[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(modules);
}

export async function getModuleBySlug(slug: string): Promise<Module | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(modules).where(eq(modules.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createModule(module: InsertModule): Promise<Module | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.insert(modules).values(module);
  return result ? (await getModuleBySlug(module.slug)) || null : null;
}

// Students
export async function getStudentByUserId(userId: number): Promise<Student | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(students).where(eq(students.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createStudent(student: InsertStudent): Promise<Student | null> {
  const db = await getDb();
  if (!db) return null;
  await db.insert(students).values(student);
  const result = await getStudentByUserId(student.userId);
  return result || null;
}

export async function updateStudent(studentId: number, updates: Partial<InsertStudent>): Promise<Student | null> {
  const db = await getDb();
  if (!db) return null;
  await db.update(students).set(updates).where(eq(students.id, studentId));
  const result = await db.select().from(students).where(eq(students.id, studentId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Classes
export async function getClassesByModuleId(moduleId: number): Promise<Class[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(classes).where(eq(classes.moduleId, moduleId));
}

export async function createClass(classData: InsertClass): Promise<Class | null> {
  const db = await getDb();
  if (!db) return null;
  await db.insert(classes).values(classData);
  const result = await db.select().from(classes).where(eq(classes.moduleId, classData.moduleId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Takes
export async function getTakesByStudentId(studentId: number): Promise<Take[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(takes).where(eq(takes.studentId, studentId));
}

export async function getTakesByClassId(classId: number): Promise<Take[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(takes).where(eq(takes.classId, classId));
}

export async function createTake(take: InsertTake): Promise<Take | null> {
  const db = await getDb();
  if (!db) return null;
  await db.insert(takes).values(take);
  const result = await db.select().from(takes).where(eq(takes.studentId, take.studentId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function updateTake(takeId: number, updates: Partial<InsertTake>): Promise<Take | null> {
  const db = await getDb();
  if (!db) return null;
  await db.update(takes).set(updates).where(eq(takes.id, takeId));
  const result = await db.select().from(takes).where(eq(takes.id, takeId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Banners
export async function getBanners(): Promise<Banner[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(banners);
}

export async function createBanner(banner: InsertBanner): Promise<Banner | null> {
  const db = await getDb();
  if (!db) return null;
  await db.insert(banners).values(banner);
  const result = await db.select().from(banners).limit(1);
  return result.length > 0 ? result[0] : null;
}

// Notifications
export async function getNotificationsByUserId(userId: number): Promise<Notification[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(notifications).where(eq(notifications.userId, userId));
}

export async function createNotification(notification: InsertNotification): Promise<Notification | null> {
  const db = await getDb();
  if (!db) return null;
  await db.insert(notifications).values(notification);
  const result = await db.select().from(notifications).where(eq(notifications.userId, notification.userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function markNotificationAsRead(notificationId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(notifications).set({ isRead: 1 }).where(eq(notifications.id, notificationId));
}
