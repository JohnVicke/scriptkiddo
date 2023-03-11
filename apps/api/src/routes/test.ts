import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { chatServers, InserChatServer } from "../db/schema/chat-server";

const routes: FastifyPluginAsync = async (server) => {
  server.get("/hello", {}, async (request, response) => {
    response.status(200).send({ hello: "world" });
  });
  server.get("/din-mamma", {}, async (request, response) => {
    const { db } = server;
    const insertServer: InserChatServer = {
      serverName: "din mamma",
    };
    const chatServer = await db.insert(chatServers).values(insertServer).returning();
    response.status(200).send(chatServer);
  });
};

export const helloRoutes = fp(routes);
