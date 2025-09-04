import { v4 as uuid } from "uuid";
import { usersRepo } from "../Shared/data";
import { hashPassword } from "../Shared/utils";
import { User } from "./users.entity";

export class UserService {
  getProfile(userId: string): User | undefined {
    return usersRepo.findById(userId);
  }

  updateProfile(userId: string, data: Partial<User>): User | undefined {
    if (data.password) {
      data.password = hashPassword(data.password);
    }
    return usersRepo.update(userId, data);
  }

  createCoach(data: { name: string; email: string; password: string }): User {
    const existing = usersRepo.findAll().find(u => u.email === data.email);
    if (existing) throw new Error("Email exists");

    const newCoach: User = {
      id: uuid(),
      name: data.name,
      email: data.email,
      password: hashPassword(data.password),
      role: "COACH",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return usersRepo.create(newCoach);
  }

  findByEmail(email: string): User | undefined {
    return usersRepo.findAll().find(u => u.email === email);
  }
}
