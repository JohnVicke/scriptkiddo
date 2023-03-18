import { z, ZodError } from "zod";
import { config } from "dotenv";
import path from "path";

console.log("🔎 Loading environment variables...");

config({ path: path.join(__dirname, "../../.env") });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().regex(/^\d+$/).transform(Number).default("8080"),
  POSTGRES_CONNECTION_STRING: z.string().url(),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
});

const parsed = envSchema.safeParse(process.env);

export const formatErrors = (errors: ReturnType<ZodError["format"]>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value) return `${name}: ${(value as any)._errors.join(", ")}\n`;
    })
    .filter(Boolean);

if (!parsed.success) {
  console.log(parsed.error.format);
  console.error("❌ Invalid environment variables:\n", ...formatErrors(parsed.error.format()));
  process.exit(1);
}

console.log("✅ Environment variables loaded successfully.");
export const env = parsed.data;
