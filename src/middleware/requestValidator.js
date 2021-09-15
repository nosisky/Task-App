import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../users/user.model";

/**
 * middleware
 * @description Validates create task
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 */
export const validateCreateTask = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),

    description: Joi.string().alphanum().min(3).max(100).required(),

    deadline: Joi.date().required(),

    reminderTime: Joi.date().required(),
  });

  try {
    const value = await schema.validateAsync(req.body);

    req.body = value;
    req.body.userId = req.decoded._id;
    next();
  } catch (err) {
    const errorResponse = err.details.map((error) =>
      error.message.replace(/["']/g, "")
    );

    res.status(400).send({ errorResponse });
  }
};

/**
 * middleware
 * @description Validates create user object
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 */
export const validateCreateUser = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),

    password: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body);

    await sendUserInput(req, res, next);
  } catch (err) {
    const errorResponse = err.details.map((error) =>
      error.message.replace(/["']/g, "")
    );

    res.status(400).send({ errorResponse });
  }
};

/**
 * middleware
 * @description Sends validated user input to the controller method
 *
 * @param {Object} req - request
 *
 * @param {Object} res - response
 *
 */
const sendUserInput = async (req, res, next) => {
  const email = req.body.email.toLowerCase();

  return User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(409).send({
        message: "Email already exist",
      });
    } else {
      const password = bcrypt.hashSync(req.body.password, 10);
      req.body = {
        email,
        name: req.body.name,
        password,
      };
      next();
    }
  });
};
