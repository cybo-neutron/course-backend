import { timestamps } from "db/helpers/timestamps.helper";
import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  text,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const ContentCompletionStatus = pgEnum("contentCompletionStatus", [
  "completed",
  "incomplete",
  "in_progress",
]);

export const ContentCompletion = pgTable("content_completion", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  courseId: uuid("courseId"),
  userId: uuid("userId"),
  contentId: uuid("contentId"),
  completionStatus: ContentCompletionStatus("contentCompletionStatus")
    .default("incomplete")
    .notNull(),
  ...timestamps,
});

export const ContentCompletionSelectSchma = createSelectSchema(
  ContentCompletion
).extend({});

export type CourseEnrollmentSchema = z.infer<
  typeof ContentCompletionSelectSchma
>;
