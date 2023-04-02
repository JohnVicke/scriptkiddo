import { type InsertServerMember } from "$db/server-member.model";

export async function createServerMember(serverMemberInput: InsertServerMember) {
  return { id: 1, type: "admin", ...serverMemberInput } as const;
}
