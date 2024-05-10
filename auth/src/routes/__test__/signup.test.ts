import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test.com",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: null,
    })
    .expect(400);
});

it("returns a 400 with an invalid email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: null,
      password: null,
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: null,
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: null,
      password: "password",
    })
    .expect(400);
});
