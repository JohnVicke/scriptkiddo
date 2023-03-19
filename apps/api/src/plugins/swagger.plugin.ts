import fp from "fastify-plugin";
import { type FastifyPluginAsync } from "fastify";
import fastifySwagger, { type FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import fastifySwaggerUi, { type FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { version } from "../../package.json";

const docsPlugin: FastifyPluginAsync = async (server) => {
  const openApiOptions: FastifyDynamicSwaggerOptions = {
    openapi: {
      info: {
        title: "ScriptKiddo Fastify API",
        description: "REST API",
        version,
      },
    },
    hideUntagged: true,
  };

  await server.register(fastifySwagger, openApiOptions);

  const openApiUiOptions: FastifySwaggerUiOptions = {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  };

  await server.register(fastifySwaggerUi, openApiUiOptions);
};

export const swaggerPlugin = fp(docsPlugin);
