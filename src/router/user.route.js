
import { createUser, updateUser, fetchAllUsers, fetchSingleUser, deleteUser } from "../controller/user.controller.js";
import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import authorization from "../middleware/authorization.middleware.js";
const userRouter = express.Router()



userRouter.post("/create-user", authMiddleware,authorization,createUser)
userRouter.put("/update-user/:id",authMiddleware,authorization, updateUser)
userRouter.get("/get-all", fetchAllUsers)
userRouter.get("/get-user/:id", fetchSingleUser)
userRouter.delete("/delete-user/:id", deleteUser)

export default userRouter