import "babel-polyfill";
import request from "supertest";
import db from "../database/connections/tables";

let server;

describe("intervention tests", () => {
  beforeEach(async () => {
    await db.createUserTable();
    await db.createIncidentsTable();
    server = require("../app");
  });
  afterEach(async () => {
    await db.dropUserTable();
    await db.dropIncidentsTable();
    await server.close();
  });

  describe("intervention end points", () => {
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
    const intervention = {
      type: "intervention",
      location: "123.65,5678",
      images: ["i.jpg", "s.jpg"],
      videos: ["hello.jpg", "hi.hpg"],
      comment: "just the first test"
    };
    const intervention1 = {
      type: "red-flag",
      location: "123.65,5678",
      images: ["i.jpg", "s.jpg"],
      videos: ["hello.jpg", "hi.hpg"],
      comment: "just the first test"
    };
    const intervention2 = {
      type: "",
      location: "123.65,5678",
      images: ["i.jpg", "s.jpg"],
      videos: ["hello.jpg", "hi.hpg"]
    };
    let token;
    beforeEach(async () => {
      const respons = await request(server)
        .post("/api/v1/auth/signup")
        .send(user);
      token = respons.body.token;
    });
    const exec = async () => {
      return await request(server)
        .get("/api/v1/interventions")
        .set("x-auth-token", token)
        .send();
    };
    const exec1 = async () => {
      return await request(server)
        .get("/api/v1/interventions")
        .set("x-auth-token", token)
        .send();
    };
    const exec2 = async () => {
      return await request(server)
        .post("/api/v1/interventions")
        .set("x-auth-token", token)
        .send(intervention);
    };
    const exec3 = async () => {
      return await request(server)
        .post("/api/v1/interventions")
        .set("x-auth-token", token)
        .send(intervention1);
    };
    const exec4 = async () => {
      return await request(server)
        .post("/api/v1/interventions")
        .set("x-auth-token", token)
        .send(intervention2);
    };
    it("should return 400 if no any intervention is in the database", async () => {
      res = await exec();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 200 if there exists any intervention", async () => {
      await exec2();
      res = await exec1();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
    });
    it("should return 400 if type is not intervention", async () => {
      res = await exec3();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 400 if any compusary property is not given of enpty ", async () => {
      res = await exec4();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 201 if a intervention is created successfully", async () => {
      res = await exec2();

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
    });
  });
  describe("intervention end points", () => {
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
    const intervention = {
      createdby: 1,
      type: "intervention",
      location: "123.65,5678",
      images: ["i.jpg", "s.jpg"],
      videos: ["hello.jpg", "hi.hpg"],
      comment: "just the first test"
    };
    const comment = {
      comment: "hello again"
    };
    const comment1 = {
      comment: ""
    };
    const location = {
      location: "hello again"
    };
    const location1 = {
      location: ""
    };

    let token, id, respons;
    beforeEach(async () => {
      respons = await request(server)
        .post("/api/v1/auth/signup")
        .send(user);
      token = respons.body.token;
      await request(server)
        .post("/api/v1/interventions")
        .set("x-auth-token", token)
        .send(intervention);
    });

    const exec = async () => {
      return await request(server)
        .get("/api/v1/interventions/" + id)
        .set("x-auth-token", token)
        .send();
    };
    const exec1 = async () => {
      return await request(server)
        .delete("/api/v1/interventions/" + id)
        .set("x-auth-token", token)
        .send();
    };
    // comment functions
    const exec2 = async () => {
      return await request(server)
        .patch("/api/v1/interventions/" + id + "/comment")
        .set("x-auth-token", token)
        .send(comment);
    };

    const exec3 = async () => {
      respons = await request(server)
        .post("/api/v1/auth/signup")
        .send(user1);
      token = respons.body.token;
      return await request(server)
        .post("/api/v1/interventions")
        .set("x-auth-token", token)
        .send(intervention);
    };
    const exec4 = async () => {
      return await request(server)
        .patch("/api/v1/interventions/" + id + "/comment")
        .set("x-auth-token", token)
        .send(comment1);
    };
    // locaion updating functions
    const exec5 = async () => {
      return await request(server)
        .patch("/api/v1/interventions/" + id + "/location")
        .set("x-auth-token", token)
        .send(location);
    };
    const exec7 = async () => {
      return await request(server)
        .patch("/api/v1/interventions/" + id + "/location")
        .set("x-auth-token", token)
        .send(location1);
    };

    it("should return 404 if intervention of that id is not found", async () => {
      id = 3;
      res = await exec();

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 200 if intervention of that id is found", async () => {
      id = 1;
      res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
    });
    it("should return 404 if intervention of that id is not found", async () => {
      id = 3;
      res = await exec1();

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 200 if intervention of that id is found", async () => {
      id = 1;
      res = await exec1();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data.message");
      expect(res.body).toHaveProperty("data.id");
    });
    it("should return 403 if current user did not create the intervention", async () => {
      id = 1;
      await exec3();
      res = await exec1();
      expect(res.status).toBe(403);
    });

    it("should return 200 the comment is successfully updated", async () => {
      id = 1;
      res = await exec2();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("status");
    });
    it("should return 400 if comment is not provided", async () => {
      id = 1;
      res = await exec4();
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 403 user did not create the intervention", async () => {
      id = 1;
      await exec3();
      res = await exec2();
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("error");
    });
    // // location tests
    it("should return 200 the location is successfully updated", async () => {
      id = 1;
      res = await exec5();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("status");
    });
    it("should return 400 if location is not provided", async () => {
      id = 1;
      res = await exec7();
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
    it("should return 403 user did not create the intervention", async () => {
      id = 1;
      await exec3();
      res = await exec5();
      expect(res.status).toBe(403);
      expect(res.body).toHaveProperty("error");
    });
  });
  describe("intervention status", () => {
    let res;
    const user = {
      firstname: "john",
      lastname: "doe",
      username: "johnjoe",
      email: "johndoe@gmail.com",
      password: "john123",
      phonenumber: "123456778",
      isadmin: true
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
    const login = {
      email: "muhamu@gmail.com",
      password: "ammedi123"
    };
    const intervention = {
      type: "intervention",
      location: "123.65,5678",
      images: ["i.jpg", "s.jpg"],
      videos: ["hello.jpg", "hi.hpg"],
      comment: "just the first test"
    };
    const status = {
      status: "rejected"
    };
    const status1 = {
      status: ""
    };
    let token, id, respons;
    beforeEach(async () => {
      respons = await request(server)
        .post("/api/v1/auth/signup")
        .send(user1);
      token = respons.body.token;
      await request(server)
        .post("/api/v1/interventions")
        .set("x-auth-token", token)
        .send(intervention);
    });

    const exec = async () => {
      return await request(server)
        .patch("/api/v1/interventions/" + id + "/status")
        .set("x-auth-token", token)
        .send(status);
    };
    const exec1 = async () => {
      const res = await request(server)
        .post("/api/v1/auth/signup")
        .send(user);
      token = res.body.token;
    };
    const exec3 = async () => {
      return await request(server)
        .patch("/api/v1/interventions/" + id + "/status")
        .set("x-auth-token", token)
        .send(status1);
    };

    it("should return 200 if status of the intervention is updated", async () => {
      id = 1;
      await exec1();
      res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(
        "data.message",
        "Updated intervention record’s status"
      );
    });
    it("should return 401 is user is not an admin", async () => {
      id = 1;

      res = await exec();

      expect(res.status).toBe(403);
    });

    it("should return 400 is status is not provided or its not a propriate", async () => {
      id = 1;
      await exec1();
      res = await exec3();
      expect(res.status).toBe(400);
    });
    it("should return 404 is status if intervention is not found", async () => {
      id = 2;
      await exec1();
      res = await exec3();
      expect(res.status).toBe(400);
    });
  });
});
