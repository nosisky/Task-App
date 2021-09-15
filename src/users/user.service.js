import Q from "q";
import { generateSignedToken } from "../utils/helpers";
import User from "./user.model";
import omit from "lodash/omit";
import bcrypt from "bcrypt";

class UserService {
  async getAll() {
    const deferred = Q.defer();

    User.find({}, (err, todos) => {
      if (err) deferred.reject(err);
      deferred.resolve(todos);
    });

    return deferred.promise;
  }

  async update(id, name, completed) {
    const deferred = Q.defer();
    const query = {};

    if (name) query.name = name;
    if (completed) query.completed = completed;

    if (Object.keys(query).length > 0) {
      User.update({ _id: id }, { $set: query }, (err, todo) => {
        if (err) deferred.reject(err);

        deferred.resolve(todo);
      });
    } else {
      // reject promise if name and completed information is missing
      deferred.reject({});
    }

    return deferred.promise;
  }

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
          const token = generateSignedToken(currentUser);
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
