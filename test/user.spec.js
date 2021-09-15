import chai from "chai";
import mongoose from "mongoose";
import chaiHttp from "chai-http";
import server from "../server";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

chai.should();
chai.use(chaiHttp);
before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.disconnect();
  await mongoose.connect(mongoUri);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Users", () => {
  const validUserPayload = {
    name: "test",
    email: "test@test.com",
    password: "test",
  };
  describe("#Failure", () => {
    it("it should fail to create user when email is invalid", (done) => {
      chai
        .request(server)
        .post("/api/v1/user/signup")
        .send({
          name: "test",
          email: "invalid email .com",
          password: "test",
        })
        .end(function (err, res) {
          res.body.should.have
            .property("errorResponse")
            .eql(["email must be a valid email"]);
        });
      done();
    });
  });

  describe("#Success", () => {
    it("it should successfully create user when input is valid", (done) => {
      chai
        .request(server)
        .post("/api/v1/user/signup")
        .send(validUserPayload)
        .end(function (err, res) {
          res.body.should.have
            .property("message")
            .eql("User created successfully");
          res.body.should.have.property("token");
        });
      done();
    });
  });

  describe("#Login Failure", () => {
    it("it should fail to authenticate a user for invalid email or password", (done) => {
      chai
        .request(server)
        .post("/api/v1/user/login")
        .send({ email: "foo@bar.com", password: "fakepassword" })
        .end(function (err, res) {
          res.body.should.have.property("message").eql("Invalid Credentials.");
        });
      done();
    });
  });

  describe("#Login Success", () => {
    it("it should successfully authenticate a user for valid email and password", (done) => {
      chai
        .request(server)
        .post("/api/v1/user/login")
        .send({ email: "test@test.com", password: "test" })
        .end(function (err, res) {
          res.body.should.have
            .property("message")
            .eql("Logged In Successfully");

          res.body.should.have.property("token");
        });
      done();
    });
  });
});
