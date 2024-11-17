import { Router } from "express";
import authRoute from "./auth.route";
import courseRoute from "./course.route";

const router: Router = Router();

router.use("/v1/auth", authRoute);
router.use("/v1/course", courseRoute);

export default router;
