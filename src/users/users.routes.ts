import { Router } from "express";
import { UsersController } from "./users.controller";
import { authMiddleware, requireRole } from "../Shared/middlewares";

const router = Router();

router.get("/me", authMiddleware, UsersController.me);
router.put("/me", authMiddleware, UsersController.updateMe);
router.post("/coach", authMiddleware, requireRole(["ADMIN"]), UsersController.createCoach);

export default router;



