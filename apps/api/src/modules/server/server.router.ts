import { FastifyInstance } from "fastify";
import { createServerHandler } from "./server.controller";
import { createServerSchema } from "./server.schema";

export async function serverRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/",
    handler: createServerHandler({ db: fastify.db }),
    schema: createServerSchema,
  });
}
