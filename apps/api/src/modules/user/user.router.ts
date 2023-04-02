import { FastifyInstance } from "fastify";
import { createUserHandler, getUserHandler } from "./user.controller";
import { createUserSchema, getUserSchema } from "./user.schema";

export async function userRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/",
    handler: createUserHandler({ db: fastify.db }),
    schema: createUserSchema,
  });
  fastify.route({
    method: "GET",
    url: "/:id",
    handler: getUserHandler({ db: fastify.db }),
    schema: getUserSchema,
  });
}
