import ioClient, { Socket } from "socket.io-client";
import type { MainEmitEvents, MainListenEvents } from "@sk/api/src/types/shared";

const ENDPOINT = "ws://localhost:8080";

const socket: Socket<MainEmitEvents, MainListenEvents> = ioClient(ENDPOINT);

export const io = socket;
