import { describe, it, vi, expect } from "vitest";
import { createServer } from "../../../utils/create-server";
import type { InsertServerMember } from "../../../db/server-member.model";
import * as ServerMemberService from "../server-member.service";

describe("[POST] /api/server-member/", () => {
  it("should call createServerMember service", async () => {
    const server = await createServer();
    await server.ready();

    const type = "member" as const;

    const payload: InsertServerMember = {
      userId: 1,
      serverId: 2,
      type,
    };

    const createdAt = new Date();
    const updatedAt = new Date();

    const serverMember = {
      id: 1,
      createdAt,
      updatedAt,
      type,
      ...payload,
    };

    const createServerSpy = vi.spyOn(ServerMemberService, "createServerMember");
    expect(createServerSpy.getMockName()).toEqual("createServerMember");
    createServerSpy.mockResolvedValue(serverMember);

    const response = await server.inject({
      method: "POST",
      url: "/api/server-member",
      payload,
    });

    expect(response.json()).toEqual({
      ...serverMember,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
    expect(createServerSpy).toBeCalledWith(payload);
  });
});
