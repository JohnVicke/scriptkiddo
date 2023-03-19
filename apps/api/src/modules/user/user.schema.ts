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

export const getUserSchema = {
  tags: ["user"],
  description: "Gets a user resource",
  params: Type.Object({
    id: Type.Number(),
  }),
  response: {
    200: user,
  },
};

export type CreateUserBody = Static<typeof createUserSchema.body>;
export type GetUserParams = Static<typeof getUserSchema.params>;
