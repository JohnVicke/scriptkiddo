import { SKRouteHandler } from "$types/create-route-handler";
import { CreateServerMemberBody } from "./server-member.schema";
import { createServerMember } from "./server-member.service";

export const createServerMemberHandler: SKRouteHandler<{ Body: CreateServerMemberBody }> = ({
  db,
}) => {
  return async (request, reply) => {
    const server = await createServerMember(request.body);
    return reply.code(201).send(server);
  };
};
