import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { FastifyBaseLogger, FastifyInstance } from "fastify";
import { Http2SecureServer, Http2ServerRequest, Http2ServerResponse } from "http2";
import { Server } from "socket.io";
import {
  MainEmitEvents,
  MainListenEvents,
  MainServerEvents,
  MainSocketData,
} from "../types/shared/socket-io";
type TypedIoServer = Server<MainListenEvents, MainEmitEvents, MainServerEvents, MainSocketData>;

export const onServerReady = (
  server: FastifyInstance<
    Http2SecureServer,
    Http2ServerRequest,
    Http2ServerResponse,
    FastifyBaseLogger,
    TypeBoxTypeProvider
  >,
  err: Error,
) => {
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
};
