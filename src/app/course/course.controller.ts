import logger from "@utils/logger";
import { Request, Response } from "express";
import * as CourseRepo from "./course.repo";

export async function getCourseById(req: Request, res: Response) {
  try {
    // const {courseId} = req.params;

    console.log("params->", req.params);
    console.log("query-> ", req.query);
    const { courseId } = req.params;
    const course = await CourseRepo.getCourseById(courseId);

    res.status(200).json({
      payload: course,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
}

export const createNewCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, isPublished } = req.body;
    console.log({ title, description, isPublished });

    const createdCourse = await CourseRepo.createCourse({
      title,
      description,
      isPublished,
    });

    res.status(201).json({
      message: "Course created successfully",
      payload: createdCourse,
    });
  } catch (error) {
    logger.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    console.log({ title, description, id });
    const updatedCourse = await CourseRepo.updateCourse(
      {
        title,
        description,
      },
      {
        id,
      }
    );

    res.status(200).json({
      message: "Course updated successfully",
      payload: updatedCourse,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const deletedCourse = await CourseRepo.deleteCourse({ id });
    res
      .status(200)
      .json({ message: "Course deleted successfully", payload: deletedCourse });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPlatformCourses = async (req: Request, res: Response) => {
  try {
    logger.info(req.query);
    logger.info(req.params);

    const { query } = req.query;

    const allCourses = await CourseRepo.getAllPlatformCourses({
      query,
    });
    res.status(200).json({
      payload: allCourses,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
