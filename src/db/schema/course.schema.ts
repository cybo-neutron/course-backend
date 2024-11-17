import { timestamps } from "db/helpers/timestamps.helper";
import { relations, sql } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { Content } from "./content.schema";

export const Course = pgTable("course", {
  id: uuid()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  title: text(),
  description: text(),
  isDeleted: boolean().default(false),
  ...timestamps,
});

const CourseRelations = relations(Course, ({ one, many }) => ({
  contents: many(Content),
}));

export const CourseSelectSchma = createInsertSchema(Course);

export type CourseSchema = z.infer<typeof CourseSelectSchma>;
