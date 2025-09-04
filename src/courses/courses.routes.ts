import { Router } from "express";
import { CoursesController } from "./courses.controller";
import { authMiddleware } from "../shared/middlewares";

const router = Router();

router.get("/", CoursesController.getAll);
router.get("/:id", CoursesController.getById);
router.post("/", authMiddleware, CoursesController.create);
router.put("/:id", authMiddleware, CoursesController.update);
router.delete("/:id", authMiddleware, CoursesController.delete);

export default router;
