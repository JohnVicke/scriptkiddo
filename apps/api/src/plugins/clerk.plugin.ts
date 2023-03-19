import fp from "fastify-plugin";
import { clerkPlugin as clerkFastifyPlugin, ClerkFastifyOptions } from "@clerk/fastify";
import { FastifyPluginAsync } from "fastify";
import { env } from "../env";

const clerk: FastifyPluginAsync = async (server) => {
  const clerkOptions: ClerkFastifyOptions = {
    publishableKey: env.CLERK_PUBLISHABLE_KEY,
    secretKey: env.CLERK_SECRET_KEY,
  };
  server.register(clerkFastifyPlugin, clerkOptions);
};

export const clerkPlugin = fp(clerk);
