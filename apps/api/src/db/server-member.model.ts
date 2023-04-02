import { InferModel, integer, pgEnum, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { server } from "./server.model";
import { user } from "./user.model";

export const serverMemberEnum = pgEnum("server_member_type", ["owner", "admin", "member"]);

export const serverMember = pgTable("server_member", {
  id: serial("id").primaryKey(),
  type: serverMemberEnum("server_member_type").default("member").notNull(),
  userId: integer("user_id").references(() => user.id),
  serverId: integer("server_id").references(() => server.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ServerMember = InferModel<typeof serverMember>;
export type InsertServerMember = InferModel<typeof serverMember, "insert">;
