import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const key = process.env.API_KEY_SECRET;

export const isLoggedIn = (req, res, next) => {
  let token;
  const tokenAvailable =
    req.headers.authorization || req.headers["x-access-token"];

  if (req.headers.authorization) {
    [, token] = req.headers.authorization.split(" ");
  } else {
    token = tokenAvailable;
  }
  if (token) {
    jwt.verify(token, key, (error, decoded) => {
      if (error) {
        res.status(401).send({
          message: "Failed to Authenticate Token",
          error,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      message: "Access denied, Authentication token does not exist",
    });
  }
};
