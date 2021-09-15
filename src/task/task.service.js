import Q from "q";
import Task from "./task.model";

class TaskService {
  async getAll(userId) {
    const tasks = await Task.find({ userId });

    if (tasks.length > 0) {
      return { tasks };
    } else {
      throw new Error("There are no task in the database");
    }
  }

  async update(updateRequest, id, userId) {
    try {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: id, userId },
        { $set: updateRequest }
      );

      if (updatedTask) {
        return {
          message: "Task updated successfully",
        };
      } else {
        throw new Error("Invalid task id supplied");
      }
    } catch (error) {
      throw new Error("Failed to update");
    }
  }

  async create(taskRequest) {
    const newTask = new Task(taskRequest);

    try {
      const createdTask = await newTask.save();

      return {
        message: "Task created successfully",
        createdTask,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id, userId) {
    try {
      const task = await Task.findOneAndRemove({ _id: id, userId });

      if (task) {
        return {
          message: "Task successfully deleted",
        };
      } else {
        throw new Error("Error occured, task ID is invalid");
      }
    } catch (error) {
      throw new Error("Invalid task id supplied");
    }
  }
}
export default TaskService;
