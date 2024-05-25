import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete(`/api/orders/${id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  let id = new mongoose.Types.ObjectId().toHexString();
  await request(app).delete(`/api/orders/${id}`).send().expect(401);
});

it("returns a 401 if the user does not own the order", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();
  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.data.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});

it("marks an order as cancelled", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();
  const user = global.signin();
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.data.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
});
