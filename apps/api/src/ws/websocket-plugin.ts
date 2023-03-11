import { FastifyPluginAsync } from "fastify";
import { Stream } from "stream";
import { createEventEmitter } from "./create-event-emitter";

/*
 * How to use promises with fastify websocket plugin
 * fastify.get('/*', { websocket: true }, (connection, request) => {
 * const sessionPromise = request.getSession() // example async session getter, called synchronously to return a promise
 *
 *   connection.socket.on('message', async (message) => {
 *     const session = await sessionPromise()
 *   })
 * })
 */

type ChatEvents = {
  sendMessage: (data: string) => void;
};

const ee = createEventEmitter<ChatEvents>();
ee.emit("sendMessage", "hello from server");

export const websocketPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.get("/chat", { websocket: true }, (connection, req) => {
    console.log(`➕➕ Connection`);

    connection.socket.on("message", (message: Stream) => {
      const data = message.toString();
      ee.emit("sendMessage", data);
    });

    connection.socket.on("close", () => {
      console.log(`➖➖ Connection`);
    });
  });
};
