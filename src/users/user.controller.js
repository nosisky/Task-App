import TodoDa from "./task.service";

class UserController {
  async getAllTask(req, res) {
    TodoDa.getAll()
      .then((todos) => res.status(200).json(todos))
      .catch(() => res.sendStatus(422));
  }

  async updateTask(req, res) {
    const { id } = req.params;
    const { name, completed } = req.body;

    TodoDa.update(id, name, completed)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(422));
  }

  async createTask(req, res) {
    const { name } = req.body;

    TodoDa.create(name)
      .then((todo) => res.status(200).json(todo))
      .catch(() => res.sendStatus(422));
  }

  async deleteTask(req, res) {
    const { id } = req.params;

    TodoDa.remove(id)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(422));
  }
}
export default UserController;
