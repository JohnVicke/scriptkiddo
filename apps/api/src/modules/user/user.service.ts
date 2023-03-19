import { InsertUser } from "./user.model";

export async function createUser(userInput: InsertUser) {
  return { id: 1, ...userInput };
}
