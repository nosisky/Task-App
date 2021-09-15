import { generateSignedToken } from "../utils/helpers";
import User from "../models/user.model";
import omit from "lodash/omit";
import bcrypt from "bcrypt";

class UserService {
  /**
   * @description Creates a new user
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @return {Object} - returns newly created user with authentication token
   */
  async create(userObject) {
    try {
      const newUser = new User({
        name: userObject.name,
        email: userObject.email,
        password: userObject.password,
      });
      const createdUser = await newUser.save();
      const userResponse = {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      };

      const token = generateSignedToken(userResponse);
      return {
        message: "User created successfully",
        data: userResponse,
        token,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description Authenticates a user
   *
   * @param {Object} req - request
   *
   * @param {Object} res - response
   *
   * @return {Object} - returns success mesage and authentication token
   */
  async loginUser(loginRequest) {
    if (!loginRequest.email || !loginRequest.password) {
      throw new Error("Please provide your email or password to login");
    }

    const email = loginRequest.email.toLowerCase();

    return User.findOne({
      email,
    })
      .then((user) => {
        if (user && bcrypt.compareSync(loginRequest.password, user.password)) {
          const currentUser = omit(user.toObject(), [
            "password",
            "createdDate",
          ]);

          const currentUserResponse = {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
          };
          const token = generateSignedToken(currentUserResponse);
          return {
            message: "Logged In Successfully",
            token,
          };
        }
        return {
          message: "Invalid Credentials.",
        };
      })
      .catch((error) => error);
  }
}

export default UserService;
