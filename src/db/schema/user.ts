import { timestamps } from "db/helpers/timestamps.helper";
import { sql } from "drizzle-orm";
import { pgTable, uuid, varchar, text, pgEnum } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export enum UserRoles {
  ADMIN = "admin",
  MENTOR = "mentor",
  USER = "user",
}

export const UserRole = pgEnum("role", ["admin", "mentor", "user"]);

export const User = pgTable("user", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  role: UserRole("role").default("user"),
  ...timestamps,
});

export const UserSelectSchema = createSelectSchema(User);

export type UserSchema = z.infer<typeof UserSelectSchema>;
