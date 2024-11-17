import { Router } from "express";
import * as authController from "app/auth/auth.controller";

const router: Router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verifyToken", authController.verifyToken);

export default router;
