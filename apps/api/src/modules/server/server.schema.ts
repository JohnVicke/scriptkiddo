import { Static, Type } from "@sinclair/typebox";

const server = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

const serverBody = Type.Object({
  name: Type.String(),
});

export const createServerSchema = {
  tags: ["server"],
  description: "Creates a server resource",
  body: serverBody,
  response: {
    201: server,
  },
};

export type CreateServerBody = Static<typeof createServerSchema.body>;
