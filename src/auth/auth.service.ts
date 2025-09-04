import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { usersRepo } from "../shared/data";
import { hashPassword, comparePassword } from "../shared/utils";
import { User } from "../users/users.entity";

const JWT_SECRET = "secretkey";

export class AuthService {
  register(data: { name: string; email: string; password: string }): User {
    const existing = usersRepo.findAll().find(u => u.email === data.email);
    if (existing) throw new Error("Email already exists");

    const user: User = {
      id: uuid(),
      name: data.name,
      email: data.email,
      password: hashPassword(data.password),
      role: "STUDENT",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return usersRepo.create(user);
  }

  login(email: string, password: string): { token: string; user: User } {
    const user = usersRepo.findAll().find(u => u.email === email);
    if (!user || !comparePassword(password, user.password)) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, user };
  }
}
