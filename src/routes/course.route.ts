import { Router } from "express";
import * as courseController from "@app/course/course.controller";

const router: Router = Router();

router.post("/create", courseController.createNewCourse);
router.put("/update/:id", courseController.updateCourse);
router.delete("/delete", courseController.deleteCourse);
router.get("/platform", courseController.getAllPlatformCourses);
router.get("/:courseId", courseController.getCourseById);

export default router;
