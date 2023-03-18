import { createClerkClient } from "@clerk/fastify";
import { env } from "../env";

export const clerkOptions = {
  publishableKey: env.CLERK_PUBLISHABLE_KEY,
  secretKey: env.CLERK_SECRET_KEY,
};

export const clerkClient = createClerkClient(clerkOptions);
