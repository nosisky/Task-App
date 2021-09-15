import express from "express";
import { validateCreateUser } from "../middlewares/requestValidator";
import UserService from "../services/user.service";

import UserController from "../controllers/user.controller";

const userService = new UserService();

const userController = new UserController(userService);

const userRouter = express.Router();

userRouter.post(
  "/signup",
  validateCreateUser,
  userController.createUser.bind(userController)
);
userRouter.post("/login", userController.loginUser.bind(userController));

export default userRouter;
