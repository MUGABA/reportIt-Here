import "babel-polyfill";
import request from "supertest";
import db from "../database/connections/tables";
import generateToken from "../helpers/otherHelpers/generateToken";

let server;

describe("red-Flags", () => {
  beforeEach(async () => {
    await db.createUserTable();
    server = require("../app");
  });
  afterEach(async () => {
    await db.dropUserTable();

    await server.close();
  });

  describe("user signup", () => {
    let res;
    const user = {
      firstname: "john",
      lastname: "doe",
      username: "johnjoe",
      email: "johndoe@gmail.com",
      password: "john123",
      phonenumber: "123456778",
      isadmin: false
    };
    const user1 = {
      firstname: "john",
      lastname: "doe",
      username: "johnjoe",
      email: "john@gmail.com",
      password: "john123",
      phonenumber: "123456778",
      isadmin: false
    };
    const user2 = {
      firstname: "",
      lastname: "doe",
      username: "johnjoe",
      email: "john@gmail.com",
      password: "john123",
      phonenumber: "123456778",
      isadmin: false
    };

    beforeEach(async () => {
      const respons = await request(server)
        .post("/api/v1/auth/signup")
        .send(user);
    });
    const exec = async () => {
      return await request(server)
        .post("/api/v1/auth/signup")
        .send(user1);
    };
    const exec1 = async () => {
      return await request(server)
        .post("/api/v1/auth/signup")
        .send(user);
    };
    const exec2 = async () => {
      return await request(server)
        .post("/api/v1/auth/signup")
        .send(user2);
    };

    it("should return 201 if the user is successfully registered", async () => {
      res = await exec();

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("user");
    });
    it("should return 400 if user is already registered", async () => {
      res = await exec1();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 400 if some details are not given", async () => {
      res = await exec2();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("user signin", () => {
    let res;
    const user = {
      firstname: "john",
      lastname: "doe",
      username: "johnjoe",
      email: "johndoe@gmail.com",
      password: "john123",
      phonenumber: "123456778",
      isadmin: false
    };
    const login = {
      email: "johndoe@gmail.com",
      password: "john123"
    };
    const login1 = {
      email: "johndoe@gmail.com",
      password: "john"
    };
    const login2 = {
      email: "johndo@gmail.com",
      password: "john123"
    };
    const login3 = {
      email: "",
      password: "john123"
    };

    beforeEach(async () => {
      const respons = await request(server)
        .post("/api/v1/auth/signup")
        .send(user);
    });
    const exec = async () => {
      return await request(server)
        .post("/api/v1/auth/login")
        .send(login);
    };
    const exec1 = async () => {
      return await request(server)
        .post("/api/v1/auth/login")
        .send(login1);
    };
    const exec2 = async () => {
      return await request(server)
        .post("/api/v1/auth/login")
        .send(login2);
    };
    const exec3 = async () => {
      return await request(server)
        .post("/api/v1/auth/login")
        .send(login3);
    };

    it("should return 202 if the user is successfully logged in", async () => {
      res = await exec();

      expect(res.status).toBe(202);
      expect(res.body).toHaveProperty("user");
    });
    it("should return 400 if password is invalid", async () => {
      res = await exec1();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 400 if email is invalid", async () => {
      res = await exec2();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 400 if email or password is not provided", async () => {
      res = await exec3();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });
});
