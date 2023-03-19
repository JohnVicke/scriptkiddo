import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import fastifyIO from "fastify-socket.io";

const io: FastifyPluginAsync = async (server) => {
  const options = {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  };
  server.register(fastifyIO, options);
};

export const ioPlugin = fp(io);
