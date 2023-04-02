import { FastifyInstance } from "fastify";
import { createServerMemberHandler } from "./server-member.controller";
import { createServerMemberSchema } from "./server-member.schema";

export async function serverMemberRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/",
    handler: createServerMemberHandler({ db: fastify.db }),
    schema: createServerMemberSchema,
  });
}
