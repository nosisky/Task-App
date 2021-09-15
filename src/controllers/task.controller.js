class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }
  async getAllTask(req, res) {
    const userId = req.decoded.id;
    const page = req.query.page;
    const limit = req.query.limit;
    return this.taskService
      .getAll(userId, page, limit)
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(400).send({ message: error.message }));
  }

  async updateTask(req, res) {
    const { id } = req.params;
    const userId = req.decoded.id;
    return this.taskService
      .update(req.body, id, userId)
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(400).send({ message: error.message }));
  }

  async createTask(req, res) {
    const userId = req.decoded.id;
    req.body.userId = userId;
    return this.taskService
      .create(req.body)
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(400).send({ message: error.message }));
  }

  async deleteTask(req, res) {
    const { id } = req.params;

    const userId = req.decoded.id;
    return this.taskService
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
