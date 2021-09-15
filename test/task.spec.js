import chai from "chai";
import mongoose from "mongoose";
import chaiHttp from "chai-http";
import server from "../server";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

chai.should();
chai.use(chaiHttp);
let token;
let taskId;
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.disconnect();
  await mongoose.connect(mongoUri);

  chai
    .request(server)
    .post("/api/v1/user/signup")
    .send({
      name: "test",
      email: "test@test.com",
      password: "test",
    })
    .end(function (err, res) {
      token = res.body.token;
    });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Task", () => {
  const payload = {
    title: "Make Note",
    description: "Write some new notes",
    deadline: "2021/08/08",
    reminderTime: "2021/08/08",
  };
  describe("#Failure", () => {
    it("it should fail to create task when user is unauthorized", (done) => {
      chai
        .request(server)
        .post("/api/v1/task")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have
            .property("message")
            .eql("Access denied, Authentication token does not exist");
          done();
        });
    });
  });

  describe("#Success", () => {
    it("it should successfully create task", (done) => {
      chai
        .request(server)
        .post("/api/v1/task")
        .set("Authorization", `Bearer ${token}`)
        .send(payload)
        .end((err, res) => {
          taskId = res.body.createdTask._id;
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("Task created successfully");
          res.body.should.have
            .property("createdTask")
            .property("title")
            .eql(payload.title);
          res.body.should.have
            .property("createdTask")
            .property("description")
            .eql(payload.description);
          done();
        });
    });

    it("it should successfully update a task", (done) => {
      chai
        .request(server)
        .put(`/api/v1/task/${taskId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("Task updated successfully");
          done();
        });
    });

    it("it should successfully retrieve all tasks", (done) => {
      chai
        .request(server)
        .get(`/api/v1/task`)
        .set("Authorization", `Bearer ${token}`)
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.tasks.should.be.a("array").with.lengthOf(1);
          done();
        });
    });

    it("it should successfully delete a task", (done) => {
      chai
        .request(server)
        .delete(`/api/v1/task/${taskId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("Task successfully deleted");
          done();
        });
    });
  });
});
