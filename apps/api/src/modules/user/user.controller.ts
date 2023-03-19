import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody } from "./user.schema";
import { createUser } from "./user.service";

export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserBody }>,
  reply: FastifyReply,
) {
  const user = await createUser(request.body);
  return reply.code(201).send(user);
}
