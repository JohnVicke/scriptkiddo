import { SKRouteHandler } from "$types/create-route-handler";
import { CreateServerBody } from "./server.schema";
import { createServer } from "./server.service";

export const createServerHandler: SKRouteHandler<{ Body: CreateServerBody }> = ({ db }) => {
  return async (request, reply) => {
    const server = await createServer(request.body);
    return reply.code(201).send(server);
  };
};
