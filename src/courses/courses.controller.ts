import { Request, Response } from "express";
import { CourseService } from "./courses.service";

const service = new CourseService();

export class CoursesController {
  static getAll(_req: Request, res: Response) {
    res.json(service.getAll());
  }

  static getById(req: Request, res: Response) {
    const course = service.getById(req.params.id);
    if (!course) return res.status(404).json({ error: "Not found" });
    res.json(course);
  }

  static create(req: Request, res: Response) {
    const user = (req as any).user;
    const course = service.createCourse(user, req.body);
    res.json(course);
  }

  static update(req: Request, res: Response) {
    const user = (req as any).user;
    const updated = service.updateCourse(user, req.params.id, req.body);
    res.json(updated);
  }

  static delete(req: Request, res: Response) {
    const user = (req as any).user;
    service.deleteCourse(user, req.params.id);
    res.json({ success: true });
  }
}
