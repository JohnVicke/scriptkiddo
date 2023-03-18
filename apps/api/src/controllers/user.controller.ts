import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = getAuth(request);
  reply.code(201).send({ userId });
}
