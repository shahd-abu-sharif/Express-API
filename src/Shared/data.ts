import { GenericRepository } from "./repository";
import { User } from "../users/users.entity";
import { Course } from "../courses/courses.entity";
import { v4 as uuid } from "uuid";
import { hashPassword } from "./utils";

export const usersRepo = new GenericRepository<User>();
export const coursesRepo = new GenericRepository<Course>();

const DEFAULT_ADMIN = {
  email: "admin@no.com",
  password: "ADMIN123",
  role: "ADMIN" as const,
};

export function seedAdmin() {
  const existing = usersRepo.findAll().find(u => u.email === DEFAULT_ADMIN.email);
  if (existing) return;

  usersRepo.create({
    id: uuid(),
    name: "Admin",
    email: DEFAULT_ADMIN.email,
    password: hashPassword(DEFAULT_ADMIN.password),
    role: DEFAULT_ADMIN.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
