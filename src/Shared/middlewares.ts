import { Request, Response, NextFunction } from "express";
import { CustomError } from "./errors";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secretkey";

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) throw new CustomError(401, "Missing token");
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch {
    throw new CustomError(401, "Invalid token");
  }
}

export function requireRole(roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!roles.includes(user.role)) throw new CustomError(403, "Forbidden");
    next();
  };
}

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message });
  }
  return res.status(500).json({ error: "Internal server error" });
}

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: "Not Found" });
}
