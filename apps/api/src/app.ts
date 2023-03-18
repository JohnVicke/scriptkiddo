import { clerkPlugin } from "@clerk/fastify";
import fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import fastifyCors from "@fastify/cors";
import { Server } from "socket.io";
import { drizzleFastifyPlugin } from "./db/drizzle-connector-plugin";
import { env } from "./env";
import { userRouter } from "./routes/user.router";
import {
  MainEmitEvents,
  MainListenEvents,
  MainServerEvents,
  MainSocketData,
} from "./types/shared/socket-io";
import { clerkOptions } from "./utils/clerk-client";

export const server = fastify({ logger: true });

server.register(clerkPlugin, clerkOptions);
server.register(fastifyCors, {
  origin: "*",
  allowdHeaders: ["Authorization"],
});
server.register(drizzleFastifyPlugin, {
  connectionString: env.POSTGRES_CONNECTION_STRING,
});

server.register(fastifyIO, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

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
    socket.on("joinRoom", (room) => {
      console.log("joinRoom", room);
      socket.join(room);
    });
    socket.on("leaveRoom", (room) => {
      console.log("leaveRoom", room);
      socket.leave(room);
    });
    socket.on("disconnect", (socket) => {
      console.log(`--disconnected, Number of connections: ${io.sockets.sockets.size}}`);
    });
  });
});

server.register(userRouter, { prefix: "/api/user" });

server.get("/emit", (_req, reply) => {
  server.io.emit("hello", { hello: "world" });
  reply.send({ hello: "world" });
});

server.get("/*", async (_request, reply) => {
  reply.code(404).send({ message: "route not found" });
});
