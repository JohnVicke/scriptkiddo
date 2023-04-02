import { type TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import { corsPlugin } from "../plugins/cors.plugin";
import { ioPlugin } from "../plugins/io.plugin";
import { swaggerPlugin } from "../plugins/swagger.plugin";
import { onServerReady } from "../ws/on-server-ready";
import { env } from "../env";
import { userRouter } from "../modules/user/user.router";
import { clerkPlugin } from "../plugins/clerk.plugin";
import { drizzleFastifyPlugin } from "../plugins/drizzle-connector.plugin";
import { getServerOptions } from "./get-server-options";
import { serverRouter } from "../modules/server/server.router";
import { serverMemberRouter } from "src/modules/server-member/server-member.router";

const rootPrefix = "/api";

const plugins = [
  { plugin: drizzleFastifyPlugin, options: { connectionString: env.POSTGRES_CONNECTION_STRING } },
  { plugin: clerkPlugin },
  { plugin: corsPlugin },
  { plugin: ioPlugin },
  { plugin: swaggerPlugin },
];

const routes = [
  { router: userRouter, prefix: `${rootPrefix}/user` },
  { router: serverRouter, prefix: `${rootPrefix}/server` },
  { router: serverMemberRouter, prefix: `${rootPrefix}/server-member` },
];

export async function createServer() {
  const server = fastify(getServerOptions(env.NODE_ENV)).withTypeProvider<TypeBoxTypeProvider>();

  plugins.forEach(({ plugin, options }) => server.register(plugin, options));
  routes.forEach(({ router, prefix }) => server.register(router, { prefix }));

  server.ready((err) => onServerReady(server, err));

  return server;
}
