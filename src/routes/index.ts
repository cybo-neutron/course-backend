import { Router } from "express";
import authRoute from "./auth.route";
import courseRoute from "./course.route";
import uploadRoute from "./upload.route";
import contentRoute from "./content.route";

const router: Router = Router();

router.use("/v1/auth", authRoute);
router.use("/v1/course", courseRoute);
router.use("/v1/upload", uploadRoute);
router.use("/v1/content", contentRoute);

export default router;
