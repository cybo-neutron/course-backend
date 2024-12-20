import { Router } from "express";
import * as uploadController from "@app/upload/upload.controller";

const router: Router = Router();

router.post(
  "/get-signed-url/course-content",
  uploadController.getPreSignedUrlToUploadContent
);
router.post("/uploadToPresignedUrl", () => {});

export default router;
