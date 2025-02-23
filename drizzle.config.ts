import { defineConfig } from "drizzle-kit";
// import env from "lib/env";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  // db: {
  //   driver: "postgres",
  //   url: process.env.DATABASE_URL,
  // },
  // dbCredentials: {
  //   url: "postgresql://postgres.fyecfdyygkeutueulkgb:Hc1CWnkZKICDI1Qu@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  // },
});
