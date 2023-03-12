import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import { drizzleFastifyPlugin } from "./db/drizzle-connector-plugin";
import { env } from "./env";
import { helloRoutes } from "./routes/test";

export const server = fastify({ logger: true });

server.register(drizzleFastifyPlugin, {
  connectionString: env.POSTGRES_CONNECTION_STRING,
});

server.register(fastifyIO, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.register(helloRoutes);

server.ready((err) => {
  if (err) throw err;
  const { io } = server;
  io.on("connection", (socket) => {
    console.log(`++connected, Number of connections: ${io.sockets.sockets.size}}`);
    socket.on("disconnect", (socket) => {
      console.log(`--disconnected, Number of connections: ${io.sockets.sockets.size}}`);
    });
  });
});

server.get("/emit", (_req, reply) => {
  server.io.emit("hello", { hello: "world" });
  reply.send({ hello: "world" });
});

server.get("/*", async (_request, _reply) => {
  return { hello: "world" };
});
