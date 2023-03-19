import { FastifyReply, FastifyRequest } from "fastify";
import { CreateServerBody } from "./server.schema";
import { createServer } from "./server.service";

export async function createServerHandler(
  request: FastifyRequest<{ Body: CreateServerBody }>,
  reply: FastifyReply,
) {
  const server = await createServer(request.body);
  return reply.code(201).send(server);
}
