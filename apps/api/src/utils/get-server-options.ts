import { env } from "../env";

export const getServerOptions = (enviornment: (typeof env)["NODE_ENV"]) =>
  ({
    ajv: {
      customOptions: {
        removeAdditional: "all",
        coerceTypes: true,
        useDefaults: true,
        keywords: ["kind", "modifier"],
      },
    },
    logger:
      {
        development: {
          transport: {
            target: "pino-pretty",
            options: {
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          },
        },
        production: true,
        test: false,
      }[enviornment] ?? true,
  } as any);
