import { Static, Type } from "@sinclair/typebox";

const serverMember = Type.Object({
  id: Type.Number(),
  userId: Type.Number(),
  serverId: Type.Number(),
  type: Type.Union([Type.Literal("member"), Type.Literal("admin"), Type.Literal("owner")]),
  createdAt: Type.String({ format: "date-time" }),
  updatedAt: Type.String({ format: "date-time" }),
});

const serverMemberBody = Type.Object({
  userId: Type.Number(),
  serverId: Type.Number(),
  type: Type.Union([Type.Literal("member"), Type.Literal("admin"), Type.Literal("owner")]),
});

export const createServerMemberSchema = {
  tags: ["server"],
  description: "Creates a serverMember resource",
  body: serverMemberBody,
  response: {
    201: serverMember,
  },
};

export type CreateServerMemberBody = Static<typeof createServerMemberSchema.body>;
export type test = Static<typeof serverMember>;
