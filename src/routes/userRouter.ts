import express from 'express'
import { UserController } from '../controller/UserController'

export const userRouter = express.Router()

const userController = new UserController()

userRouter.post("/create", userController.createUser)
userRouter.post("/login", userController.login)
userRouter.get("/profile-info", userController.profileInfo)
userRouter.post("/follow-user", userController.followUser)
