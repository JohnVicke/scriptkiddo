import { createServer } from "./utils/create-server";
import { env } from "./env";

const signals = ["SIGINT", "SIGTERM", "SIGHUP"] as const;

async function main() {
  const server = await createServer();
  server.listen({ port: env.PORT }, (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  });

  signals.forEach((signal) => {
    process.on(signal, () => graceFullShutdown({ signal, server }));
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function graceFullShutdown({
  signal,
  server,
}: {
  signal: (typeof signals)[number];
  server: Awaited<ReturnType<typeof createServer>>;
}) {
  console.log(`🛑 [${signal}] Graceful shutdown...`);
  await server.close();
  console.log("🛑 Graceful shutdown complete.");
}
