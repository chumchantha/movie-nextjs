import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums for Better Auth
export const roleEnum = pgEnum("role", ["USER", "ADMIN", "MODERATOR"]);

// Users table (Better Auth compatible)
export const user = pgTable("user", {
  id: varchar("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), //nickname
  username: varchar("username", { length: 50 }).unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: varchar("image", { length: 255 }),
  role: roleEnum("role").default("USER").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Sessions table (Better Auth compatible)
export const session = pgTable("session", {
  id: varchar("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: varchar("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  userId: varchar("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

// Accounts table (Better Auth compatible for OAuth)
export const account = pgTable("account", {
  id: varchar("id").primaryKey(),
  accountId: varchar("accountId").notNull(),
  providerId: varchar("providerId").notNull(),
  userId: varchar("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: varchar("scope", { length: 255 }),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Verification table (Better Auth compatible)
export const verification = pgTable("verification", {
  id: varchar("id").primaryKey(),
  identifier: varchar("identifier").notNull(),
  value: varchar("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

// Custom user profile extension
export const userProfile = pgTable("userProfile", {
  id: varchar("id").primaryKey(),
  userId: varchar("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  bio: text("bio"),
  dateOfBirth: timestamp("dateOfBirth"),
  phoneNumber: varchar("phoneNumber", { length: 20 }),
  address: text("address"),
  preferences: text("preferences"), // JSON string
  isOnboarded: boolean("isOnboarded").default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Relations
export const userRelations = relations(user, ({ one, many }) => ({
  //one user have one userProfile
  profile: one(userProfile, {
    fields: [user.id],
    references: [userProfile.userId],
  }),
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  //one session have one user
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, {
    fields: [userProfile.userId],
    references: [user.id],
  }),
}));

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type UserProfile = typeof userProfile.$inferSelect;
export type NewUserProfile = typeof userProfile.$inferInsert;
