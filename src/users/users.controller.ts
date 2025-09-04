import { Request, Response } from "express";
import { UserService } from "./users.service";

const service = new UserService();

export class UsersController {
  static me(req: Request, res: Response) {
    const user = service.getProfile((req as any).user.id);
    res.json(user);
  }

  static updateMe(req: Request, res: Response) {
    const updated = service.updateProfile((req as any).user.id, req.body);
    res.json(updated);
  }

  static createCoach(req: Request, res: Response) {
    const coach = service.createCoach(req.body);
    res.json(coach);
  }
}
