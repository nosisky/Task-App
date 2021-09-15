import express from "express";
import { validateCreateUser } from "../middleware/requestValidator";

import UserController from "../users/user.controller";

const userController = new UserController();

const userRouter = express.Router();

userRouter.post("/signup", validateCreateUser, userController.createUser);
userRouter.post("/login", userController.loginUser);

export default userRouter;
