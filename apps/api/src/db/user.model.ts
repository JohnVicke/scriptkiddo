import { InferModel, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = InferModel<typeof user>;
export type InsertUser = InferModel<typeof user, "insert">;
