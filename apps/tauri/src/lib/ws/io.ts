import ioClient from "socket.io-client";
const ENDPOINT = "ws://localhost:8080";

const socket = ioClient(ENDPOINT);

export const io = socket;
