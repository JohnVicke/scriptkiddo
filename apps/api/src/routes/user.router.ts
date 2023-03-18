import { getAuth } from "@clerk/fastify";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { clerkClient } from "../utils/clerk-client";
import { createUser } from "../controllers/user.controller";

async function clerkPreHandler(req: FastifyRequest, reply: FastifyReply) {
  const { userId } = getAuth(req);
  if (!userId) {
    reply.status(403).send({ error: "Unauthorized" });
  }
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  return { user };
}

export async function userRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "GET",
    url: "/me",
    preHandler: [clerkPreHandler],
    handler: createUser,
  });
}
