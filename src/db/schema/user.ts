import { timestamps } from "db/helpers/timestamps.helper";
import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, text, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export enum UserRoles {
  ADMIN = "admin",
  MENTOR = "mentor",
  USER = "user",
}

export const UserRole = pgEnum(
  "role",
  ["admin", "mentor", "user"]
);

export const User = pgTable("user", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: UserRole("role").default(UserRoles.USER).notNull(),
  ...timestamps,
});

export const UserSelectSchema = createInsertSchema(User).extend({
  id: z.string().uuid().optional(),
});

export type UserSchema = z.infer<typeof UserSelectSchema>;
