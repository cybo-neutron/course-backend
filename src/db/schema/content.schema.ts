import { timestamps } from "db/helpers/timestamps.helper";
import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { Course } from "./course.schema";

export const ContentType = pgEnum("type", ["text", "image", "video", "pdf"]);
export enum ReadStatus {
  UNREAD = "unread",
  READ = "read",
  IN_PROGRESS = "in_progress",
}

export const ReadStatusEnum = pgEnum(
  "readStatus",
  ["unread", "read", "in_progreass"]
  // Object.values(ReadStatus).map((status) => status) as [string,...string[]]
);

export const ContentStatus = pgEnum("status", [
  "draft",
  "published",
  "archived",
]);

export const Content = pgTable("content", {
  id: uuid()
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  title: text().notNull(),
  description: text(),
  main_content: text(), // either text content of url of video/image/pdf
  type: ContentType().default("text"),
  parentContentId: uuid(),
  courseId: uuid(),
  readStatus: ReadStatusEnum().default(ReadStatus.UNREAD).notNull(),
  status: ContentStatus().default("draft").notNull(),
  ...timestamps,
});

// self relation as Content will have many child contents
const ContentRelation = relations(Content, ({ many, one }) => ({
  subContents: many(Content),
  parentContent: one(Content, {
    fields: [Content.parentContentId],
    references: [Content.id],
  }),
  course: one(Course, {
    fields: [Content.courseId],
    references: [Course.id],
  }),
}));

export const ContentSelectSchema = createSelectSchema(Content);

export type ContentSchema = z.infer<typeof ContentSelectSchema>;
