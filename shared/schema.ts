import { pgTable, text, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export enum PlanType {
  MINECRAFT = "minecraft",
  VPS = "vps",
  DISCORD_BOT = "discord_bot",
  WEB_HOSTING = "web_hosting"
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user"
}

// Plans
export const plans = pgTable("plans", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),
  currency: text("currency").notNull(),
  period: text("period").notNull(),
  type: text("type").notNull().$type<PlanType>(),
  features: text("features").array().notNull(),
  isPopular: boolean("is_popular").default(false).notNull(),
  isComingSoon: boolean("is_coming_soon").default(false),
  createdAt: timestamp("created_at").notNull(),
});

export const insertPlanSchema = createInsertSchema(plans).omit({
  id: true,
  createdAt: true,
});

export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type Plan = typeof plans.$inferSelect;

// Staff
export const staff = pgTable("staff", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio").notNull(),
  avatar: text("avatar"),
  skills: text("skills").array().notNull(),
  isStaffOfMonth: boolean("is_staff_of_month").default(false).notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const insertStaffSchema = createInsertSchema(staff).omit({
  id: true,
  createdAt: true,
});

export type InsertStaffMember = z.infer<typeof insertStaffSchema>;
export type StaffMember = typeof staff.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: text("id").primaryKey(),
  quote: text("quote").notNull(),
  authorName: text("author_name").notNull(),
  authorPosition: text("author_position").notNull(),
  authorCompany: text("author_company").notNull(),
  authorImage: text("author_image"),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Server Nodes
export const serverNodes = pgTable("server_nodes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  isOperational: boolean("is_operational").default(true).notNull(),
  cpuLoad: integer("cpu_load").notNull(),
  memoryUsage: integer("memory_usage").notNull(),
  networkUsage: integer("network_usage").notNull(),
  lastUpdated: timestamp("last_updated").notNull(),
});

export const insertServerNodeSchema = createInsertSchema(serverNodes).omit({
  id: true,
  lastUpdated: true,
});

export type InsertServerNode = z.infer<typeof insertServerNodeSchema>;
export type ServerNode = typeof serverNodes.$inferSelect;

// Users
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().$type<UserRole>(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
