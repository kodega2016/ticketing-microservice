import { app } from "../../app";
import request from "supertest";

it("fails when an invalid email address is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an invalid password is supplied", async () => {
  await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "password",
  });

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@tes.com",
      password: "passcode",
    })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "password",
  });

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
