import { Router } from "express";
import * as ContentController from "@app/content/content.controller";
import { Content } from "db/schema/content.schema";
import { authenticateUser } from "@app/auth/auth.service";

const router: Router = Router();

router.post("/", ContentController.createContent);
router.get('/get-content',ContentController.getContent);
router.get("/:courseId", ContentController.getAllContent);
// router.get(`/child-content/:parentId`,)
router.post("/verify-content", ContentController.verifyContent);

export default router;
