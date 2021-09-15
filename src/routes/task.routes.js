import TaskController from "../task/task.controller";
import express from "express";
import { validateCreateTask } from "../middleware/requestValidator";
import { isLoggedIn } from "../middleware/authorization";

const taskController = new TaskController();

const taskRouter = express.Router();

taskRouter
  .route("/")
  .get(isLoggedIn, taskController.getAllTask)
  .post(isLoggedIn, validateCreateTask, taskController.createTask);

taskRouter
  .route("/:id")
  .delete(isLoggedIn, taskController.deleteTask)
  .put(isLoggedIn, taskController.updateTask);

export default taskRouter;
