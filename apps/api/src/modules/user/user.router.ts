import { FastifyInstance } from "fastify";
import { createUserHandler } from "./user.controller";
import { createUserSchema } from "./user.schema";

export async function userRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/",
    handler: createUserHandler,
    schema: createUserSchema,
  });
}
