import { SKRouteHandler } from "$types/create-route-handler";
import { CreateUserBody, GetUserParams } from "./user.schema";
import { createUser, getUser } from "./user.service";

export const createUserHandler: SKRouteHandler<{ Body: CreateUserBody }> = () => {
  return async (request, reply) => {
    const user = await createUser(request.body);
    return reply.code(201).send(user);
  };
};

export const getUserHandler: SKRouteHandler<{ Params: GetUserParams }> = () => {
  return async (request, reply) => {
    const user = await getUser(request.params.id);
    return reply.send(user);
  };
};
