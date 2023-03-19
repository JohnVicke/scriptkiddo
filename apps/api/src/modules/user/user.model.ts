import { InferModel, pgTable, serial, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
});

export type User = InferModel<typeof user>;
export type InsertUser = InferModel<typeof user, "insert">;
