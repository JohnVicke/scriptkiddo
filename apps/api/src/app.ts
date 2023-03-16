import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import { drizzleFastifyPlugin } from "./db/drizzle-connector-plugin";
import { env } from "./env";
import { helloRoutes } from "./routes/test";
import { Server } from "socket.io";
import {
  MainEmitEvents,
  MainListenEvents,
  MainServerEvents,
  MainSocketData,
} from "./types/shared/socket-io";

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

type TypedIoServer = Server<MainListenEvents, MainEmitEvents, MainServerEvents, MainSocketData>;

server.ready((err) => {
  if (err) throw err;
  const { io } = server;
  (io as TypedIoServer).on("connection", (socket) => {
    console.log(`++connected, Number of connections: ${io.sockets.sockets.size}}`);
    const user = socket.id;
    socket.on("message", (message) => {
      console.log("received message", message, user);
      socket.emit("message", {
        from: user,
        message,
      });
    });
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
