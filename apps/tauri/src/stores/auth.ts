import { get, writable } from "svelte/store";
import { PUBLIC_CLERK_PUBLISHER_KEY } from "$env/static/public";
import Clerk from "@clerk/clerk-js";

export const auth = writable<{ clerk: null | Clerk; isLoaded: boolean }>({
  clerk: null,
  isLoaded: false,
});

export const initClerk = async () => {
  if (get(auth).clerk) return;
  const clerk = new Clerk(PUBLIC_CLERK_PUBLISHER_KEY);
  await clerk.load();
  auth.update(() => ({ clerk, isLoaded: true }));
};
