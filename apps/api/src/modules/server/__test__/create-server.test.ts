import { describe, it, vi, expect } from "vitest";
import { createServer } from "../../../utils/create-server";
import type { InsertServer } from "../../../db/server.model";
import * as ServerService from "../server.service";

describe("[POST] /api/server", () => {
  it("should call createServer service", async () => {
    const server = await createServer();
    await server.ready();

    const payload: InsertServer = {
      name: "HAM",
    };

    const createdAt = new Date();
    const updatedAt = new Date();

    const chatServer = {
      id: 1,
      createdAt,
      updatedAt,
      ...payload,
    };

    const createServerSpy = vi.spyOn(ServerService, "createServer");
    expect(createServerSpy.getMockName()).toEqual("createServer");
    createServerSpy.mockResolvedValue(chatServer);

    const response = await server.inject({
      method: "POST",
      url: "/api/server",
      payload,
    });

    expect(response.json()).toEqual({
      ...chatServer,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
    expect(createServerSpy).toBeCalledWith(payload);
  });
  it("should return 400 if name is missing", async () => {
    const server = await createServer();
    await server.ready();

    const payload = {};

    const response = await server.inject({
      method: "POST",
      url: "/api/server",
      payload,
    });

    expect(response.statusCode).toEqual(400);
  });
});
