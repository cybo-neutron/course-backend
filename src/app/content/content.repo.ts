import logger from "@utils/logger";
import db from "db/db";
import { Content, ContentSchema } from "db/schema/content.schema";
import { CourseSchema } from "db/schema/course.schema";
// import { Course, CourseSchema } from "db/schema/course.schema";
import { and, eq, ilike, like, sql } from "drizzle-orm";

export async function getAllContent({
  courseId,
  parentId,
}: {
  courseId: string;
  parentId?: string;
}): Promise<ContentSchema[]> {
  const condtion = [];
  if (courseId) {
    condtion.push(eq(Content.courseId, courseId));
  }
  if (parentId) {
    condtion.push(eq(Content.parentContentId, parentId));
  }
  try {
    const allContent = await db
      .select()
      .from(Content)
      .where(and(...condtion));

    return allContent;
  } catch (error) {
    throw error;
  }
}

export async function getContent({ courseId, contentId }) {
  const condition = [];
  if (!courseId) {
    throw Error("courseId is missing");
  }

  if (!contentId) {
    throw Error("contentId is missing");
  }
  // condition.push(eq(Content.courseId, courseId));
  condition.push(eq(Content.id, contentId));

  try {
    const content = await db
      .select()
      .from(Content)
      .where(and(...condition))
      .limit(1);

    return content;
  } catch (error) {
    throw error;
  }
}

export async function createContent({
  title,
  description,
  main_content,
  type,
  parentContentId,
  courseId,
}: Partial<ContentSchema>) {
  const content = await db.insert(Content).values({
    title,
    description,
    main_content,
    type,
    ...(parentContentId && { parentContentId }),
    ...(courseId && { courseId }),
  });

  return content;
}

export async function updateContent({
  title,
  description,
  main_content,
  type,
  parentContentId,
  courseId,
  id,
}: Partial<ContentSchema>) {
  const updatedContent = await db
    .update(Content)
    .set({
      ...(title && { title }),
      ...(description && { description }),
      ...(main_content && { main_content }),
      ...(type && { type }),
      ...(parentContentId && { parentContentId }),
      ...(courseId && { courseId }),
    })
    .where(eq(Content.id, id))
    .returning();

  return updatedContent;
}
