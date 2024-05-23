import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

jest.mock("../../nats-wrapper");

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "asdasd",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  await request(app)
    .put(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
    .send({
      title: "asdasd",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "asdasd",
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${response.body.data.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "asdasd",
      price: 20,
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdasd",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.data.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 20,
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asdasd",
      price: 20,
    });
  const updatedTicket = await request(app)
    .put(`/api/tickets/${response.body.data.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 100,
    })
    .expect(200);
  expect(updatedTicket.body.data.title).toEqual("new title");
  expect(updatedTicket.body.data.price).toEqual(100);
});
