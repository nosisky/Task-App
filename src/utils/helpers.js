import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const generateSignedToken = (payload) =>
  jwt.sign(payload, process.env.API_KEY_SECRET, {
    expiresIn: "3 days",
  });
