import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./src/config";
import taskRoutes from "./src/routes/task.routes";
import userRoutes from "./src/routes/user.routes";
import dotenv from "dotenv";
dotenv.config();

class Server {
  constructor() {
    this.app = express();
    this.config = config;
    this.database = process.env.MONGO_DB_URL;
    this.port = this.config.apiPort;

    this.init();
  }

  init() {
    // HTTP request logger
    this.app.use(morgan("dev"));
    this.app.use(express.json());

    mongoose // connect to database
      .connect(this.config.db, (err) => {
        if (err) {
          console.log(`[MongoDB] Failed to connect. ${err}`);
        } else {
          console.log(`[MongoDB] connected: ${this.config.db}`);

          // initialize routes
          this.app.use("/api/v1/user", userRoutes);
          this.app.use("/api/v1/task", taskRoutes);
          this.app.use("*", (req, res) => {
            res.status(404).send({
              message: "Unknown route",
            });
          });
          this.app.listen(this.port, () => {
            console.info("=================================");
            console.info(`======= ENV: ${this.config.env} =======`);
            console.info(`🚀 App listening on the port ${this.config.apiPort}`);
            console.info("=================================");
          });
        }
      });
  }
}

export default new Server().app;
