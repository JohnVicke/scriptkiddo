import { InsertUser } from "$db/user.model";

export async function createUser(userInput: InsertUser) {
  return { id: 1, ...userInput };
}

export async function getUser(id: number) {
  return { id, username: "virren1337" };
}
