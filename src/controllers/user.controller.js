class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async createUser(req, res) {
    this.userService
      .create(req.body)
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(400).send(error.message));
  }

  async loginUser(req, res) {
    this.userService
      .loginUser({ email: req.body.email, password: req.body.password })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(400).send({ message: error.message });
      });
  }
}
export default UserController;
