import { v4 as uuid } from "uuid";
import { coursesRepo } from "../Shared/data";
import { Course } from "./courses.entity";
import { User } from "../users/users.entity";

export class CourseService {
  getAll(): Course[] {
    return coursesRepo.findAll();
  }

  getById(courseId: string): Course | undefined {
    return coursesRepo.findById(courseId);
  }

  createCourse(user: User, data: { title: string; description: string; image?: string }): Course {
    if (user.role !== "COACH" && user.role !== "ADMIN") {
      throw new Error("Forbidden");
    }

    const newCourse: Course = {
      id: uuid(),
      title: data.title,
      description: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: user.id,
    };

    return coursesRepo.create(newCourse);
  }

  updateCourse(user: User, courseId: string, data: Partial<Course>): Course | undefined {
    const course = coursesRepo.findById(courseId);
    if (!course) throw new Error("Course not found");

    if (user.role === "COACH" && course.createdBy !== user.id) {
      throw new Error("Forbidden");
    }

    const updatedCourse: Partial<Course> = {
      ...data,
      updatedAt: new Date(),
    };

    return coursesRepo.update(courseId, updatedCourse);
  }

  deleteCourse(user: User, courseId: string): boolean {
    const course = coursesRepo.findById(courseId);
    if (!course) throw new Error("Course not found");

    if (user.role === "COACH" && course.createdBy !== user.id) {
      throw new Error("Forbidden");
    }

    return coursesRepo.delete(courseId);
  }
}
