import { Static, Type } from "@sinclair/typebox";

const user = Type.Object({
  id: Type.Number(),
  username: Type.String(),
});

const userBody = Type.Object({
  username: Type.String(),
});

export const createUserSchema = {
  tags: ["user"],
  description: "Creates a user resource",
  body: userBody,
  response: {
    201: user,
  },
};

export type CreateUserBody = Static<typeof createUserSchema.body>;
