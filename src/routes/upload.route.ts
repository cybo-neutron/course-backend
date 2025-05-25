import { Router } from "express";
import * as uploadController from "@app/upload/upload.controller";

const router: Router = Router();

router.post(
  "/upload-pre-signed-url",
  uploadController.getPreSignedUrlToUploadContent
);
router.post("/uploadToPresignedUrl", () => {});

// TODO : add user verification check
router.post("/transcode-video", uploadController.transcodeVideo_v1);

router.post("/transcode-video-test", uploadController.transcodeVideo_v2);

export default router;
