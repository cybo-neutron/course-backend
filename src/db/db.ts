import logger from "@utils/logger";
import { drizzle } from "drizzle-orm/postgres-js";
import env from "lib/env";
import postgres from "postgres";
let db: any;
try {
  const client = postgres(env.DATABASE_URL, { prepare: false });
  db = drizzle(client);
} catch (error: any) {
  logger.error(error, "Database Connection Error");
}
export default db;
