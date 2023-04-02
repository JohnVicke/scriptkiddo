import { InsertServer } from "$db/server.model";

export async function createServer(serverInput: InsertServer) {
  return { id: 1, ...serverInput };
}
