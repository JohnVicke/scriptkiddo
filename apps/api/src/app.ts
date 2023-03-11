import fastify from "fastify";
import { drizzleFastifyPlugin } from "./db/drizzle-connector-plugin";
import { env } from "./env";
import { helloRoutes } from "./routes/test";

export const app = fastify();

app.register(drizzleFastifyPlugin, {
  connectionString: env.POSTGRES_CONNECTION_STRING,
});

app.register(helloRoutes);

app.get("/*", async (_request, _reply) => {
  return { hello: "world" };
});
