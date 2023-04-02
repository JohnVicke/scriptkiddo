import { drizzle } from "drizzle-orm/node-postgres";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Pool } from "pg";

interface ConnectDbOptions {
  connectionString: string;
}

const connectDb: FastifyPluginAsync<ConnectDbOptions> = async (fastify, { connectionString }) => {
  if (!fastify.db) {
    const pool = new Pool({
      connectionString,
    });
    const db = drizzle(pool, { logger: true });
    fastify.decorate("db", db);
    fastify.addHook("onClose", async () => {
      await pool.end();
    });
  }
};

export const drizzleFastifyPlugin = fp(connectDb);
