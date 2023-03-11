import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  export interface FastifyInstance {
    db: NodePgDatabase;
  }
}
