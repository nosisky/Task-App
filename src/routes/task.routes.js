import TaskController from "../controllers/task.controller";
import express from "express";
import { validateCreateTask } from "../middlewares/requestValidator";
import { isLoggedIn } from "../middlewares/authorization";
import TaskService from "../services/task.service";

const taskService = new TaskService();
const taskController = new TaskController(taskService);

const taskRouter = express.Router();

taskRouter
  .route("/")
  .get(isLoggedIn, taskController.getAllTask.bind(taskController))
  .post(
    isLoggedIn,
    validateCreateTask,
    taskController.createTask.bind(taskController)
  );

taskRouter
  .route("/:id")
  .delete(isLoggedIn, taskController.deleteTask.bind(taskController))
  .put(isLoggedIn, taskController.updateTask.bind(taskController));

export default taskRouter;
