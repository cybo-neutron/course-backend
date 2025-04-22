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

export const CourseEnrollment = pgTable("course_enrollment", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  courseId: uuid("courseId"),
  userId: uuid("userId"),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  ...timestamps,
});

export const CourseEnrollmentSelectSchema = createSelectSchema(
  CourseEnrollment
).extend({});

export type CourseEnrollmentSchema = z.infer<
  typeof CourseEnrollmentSelectSchema
>;
