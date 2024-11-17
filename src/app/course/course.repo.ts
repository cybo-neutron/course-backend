import logger from "@utils/logger";
import db from "db/db";
import { Course, CourseSchema } from "db/schema/course.schema";
import { eq } from "drizzle-orm";

export async function createCourse(data: CourseSchema) {
  try {
    console.log("Creating course", data);
    const createdCourse = await db.insert(Course).values(data).returning();
    console.log(createdCourse);
    return createdCourse;
  } catch (error) {
    logger.error(`Error creating course`, error);
    throw error;
  }
}

export async function updateCourse(
  payload: CourseSchema,
  whereCondition: { id: string }
) {
  try {
    const updatedCourse = await db
      .update(Course)
      .set({
        ...(payload.title && { title: payload.title }),
        ...(payload.description && { description: payload.description }),
      })
      .where(eq(Course.id, whereCondition.id))
      .returning();

    return updatedCourse;
  } catch (error) {
    logger.error(`Error updating course`, error);
    throw error;
  }
}

export async function deleteCourse(whereCondition: { id: string }) {
  try {
    console.log(whereCondition);

    const findCourse = await db
      .select()
      .from(Course)
      .where(eq(Course.id, whereCondition.id));

    console.log("findcourse : ", findCourse);
    const deletedCourse = await db
      .update(Course)
      .set({
        isDeleted: true,
      })
      .where(eq(Course.id, whereCondition.id))
      .returning();

    console.log("deleted Course : ", deletedCourse);

    return deletedCourse;
  } catch (error) {
    logger.error("Error while deleting course : ", error);
    throw error;
  }
}
