import { InferModel, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const server = pgTable("server", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Server = InferModel<typeof server>;
export type InsertServer = InferModel<typeof server, "insert">;
