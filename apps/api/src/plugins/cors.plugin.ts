import fastifyCors, { FastifyCorsOptions } from "@fastify/cors";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const cors: FastifyPluginAsync = async (server) => {
  const options: FastifyCorsOptions = {
    origin: "*",
    allowedHeaders: ["Authorization"],
  };
  server.register(fastifyCors, options);
};

export const corsPlugin = fp(cors);
