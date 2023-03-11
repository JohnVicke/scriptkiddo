import fastify from "fastify";
import { drizzleFastifyPlugin } from "./db/drizzle-connector-plugin";
import { env } from "./env";
import { helloRoutes } from "./routes/test";
import ws from "@fastify/websocket";
import { websocketPlugin } from "./ws/websocket-plugin";

export const app = fastify();

app.register(drizzleFastifyPlugin, {
  connectionString: env.POSTGRES_CONNECTION_STRING,
});

app.register(ws, {
  errorHandler(error, connection, request, reply) {
    console.log(error);
    connection.destroy();
  },
  options: {
    maxPayload: 1024 * 1024,
  },
});

app.register(helloRoutes);
app.register(websocketPlugin);

app.get("/*", async (_request, _reply) => {
  return { hello: "world" };
});
