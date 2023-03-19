import { describe, it, vi, expect } from "vitest";
import { createServer } from "../../../utils/create-server";
import type { InsertUser, User } from "../user.model";
import * as UserService from "../user.service";

describe("POST /api/user", () => {
  it("should call createUser service", async () => {
    const server = await createServer();
    await server.ready();

    const payload: InsertUser = {
      username: "virren1337",
    };

    const user: User = {
      id: 1,
      ...payload,
    };

    const createUserSpy = vi.spyOn(UserService, "createUser");
    expect(createUserSpy.getMockName()).toEqual("createUser");
    createUserSpy.mockResolvedValue(user);

    const response = await server.inject({
      method: "POST",
      url: "/api/user",
      payload,
    });

    expect(response.json()).toEqual(user);
    expect(createUserSpy).toBeCalledWith(payload);
  });
});

describe("GET /api/user/:id", () => {
  it("should call getUser service", async () => {
    const server = await createServer();
    await server.ready();
    const id = 1;

    const user: User = {
      id,
      username: "virren1337",
    };

    const getUserSpy = vi.spyOn(UserService, "getUser");
    expect(getUserSpy.getMockName()).toEqual("getUser");
    getUserSpy.mockResolvedValue(user);

    const response = await server.inject({
      method: "GET",
      url: "/api/user/1",
    });

    expect(response.json()).toEqual(user);
    expect(getUserSpy).toBeCalledWith(id);
  });
});
