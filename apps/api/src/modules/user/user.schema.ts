import { Static, Type } from "@sinclair/typebox";
import type { Equals, AssertFalse } from "../../types/assert-equals";
import { User } from "./user.model";

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

// @ts-expect-error
type PGAndSchemaAlignment = AssertFalse<Equals<Static<typeof user>, User>>;
