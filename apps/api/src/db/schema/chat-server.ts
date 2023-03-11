import { InferModel, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const chatServers = pgTable("chat_servers", {
  id: serial("id").primaryKey(),
  serverName: text("server_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ChatServer = InferModel<typeof chatServers>;
export type InserChatServer = InferModel<typeof chatServers, "insert">;
