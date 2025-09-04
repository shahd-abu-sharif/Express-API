import express from "express";
import { seedAdmin } from "./Shared/data";
import { errorHandler, notFound } from "./Shared/middlewares";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./users/users.routes";
import { CustomError } from "./Shared/errors";
import courseRoutes from "./courses/courses.routes";

const app = express()
app.use(express.json())

const PORT = 4000

seedAdmin()

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/courses", courseRoutes)


app.use((req, res, next) => {
  next(new CustomError(404, "Route not found"))
})

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
