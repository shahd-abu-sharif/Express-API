import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const service = new AuthService();

export class AuthController {
  static register(req: Request, res: Response) {
    const user = service.register(req.body);
    res.json(user);
  }

  static login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = service.login(email, password);
    res.json(result);
  }
}
