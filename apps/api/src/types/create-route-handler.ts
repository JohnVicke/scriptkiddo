import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";

type ServerOptions = { db: NodePgDatabase };

export type SKRouteHandler<TRequest extends RequestGenericInterface> = (
  params: ServerOptions,
) => (request: FastifyRequest<TRequest>, reply: FastifyReply) => void;
