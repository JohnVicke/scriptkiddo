import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBody, GetUserParams } from "./user.schema";
import { createUser, getUser } from "./user.service";

export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserBody }>,
  reply: FastifyReply,
) {
  const user = await createUser(request.body);
  return reply.code(201).send(user);
}

export async function getUserHandler(
  request: FastifyRequest<{ Params: GetUserParams }>,
  reply: FastifyReply,
) {
  const user = await getUser(request.params.id);
  return reply.send(user);
}
