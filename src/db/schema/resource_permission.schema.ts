import { timestamps } from "db/helpers/timestamps.helper";
import { sql } from "drizzle-orm";
import { pgTable, uuid, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { UserRole } from "./user.schema";

export const ResourcePermission = pgTable("resource_permission", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .notNull(),
  role: UserRole("role").default("student").notNull(),
  attributes: jsonb(),
  ...timestamps,
});

const selectSchema = createSelectSchema(ResourcePermission);

const insertSchma = createInsertSchema(ResourcePermission);

export type ResourcePermissionInsertSchema = z.infer<typeof insertSchma>;

export type ResourcePermissionSchema = z.infer<typeof selectSchema>;
