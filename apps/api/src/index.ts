import { server } from "./app";
import { env } from "./env";

server.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
