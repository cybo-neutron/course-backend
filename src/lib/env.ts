import logger from "@utils/logger";
import { config } from "dotenv";
import path from "path";
import { z } from "zod";

const { NODE_ENV } = process.env;
const envSchema = z.object({
  PORT: z.string().default("5100"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE_DURATION: z.string(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_CONTENT_BUCKET_NAME: z.string(),
});

config({
  path:
    NODE_ENV === "local"
      ? path.join(__dirname, "../..", ".env.local")
      : path.join(__dirname, "..", ".env.prod"),
});

try {
  envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    logger.error("Invalid environment variables", error.issues);
  } else {
    logger.error("Invalid environment variables");
  }
  process.exit(1);
}

export default envSchema.parse(process.env);
