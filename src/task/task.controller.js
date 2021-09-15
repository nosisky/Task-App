import TaskService from "./task.service";

const taskService = new TaskService();

class TaskController {
  async getAllTask(req, res) {
    const userId = req.decoded._id;
    return taskService
      .getAll(userId)
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(400).send({ message: error.message }));
  }

  async updateTask(req, res) {
    const { id } = req.params;
    const userId = req.decoded._id;
    return taskService
      .update(req.body, id, userId)
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(400).send({ message: error.message }));
  }

  async createTask(req, res) {
    return taskService
      .create(req.body)
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(400).send({ message: error.message }));
  }

  async deleteTask(req, res) {
    const { id } = req.params;

    const userId = req.decoded._id;
    return taskService
      .remove(id, userId)
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(400).send({ message: error.message });
      });
  }
}
export default TaskController;
