import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the ticket is not found", async () => {
  await request(app)
    .get(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(404);
});

it("returns the ticket if the ticket is found", async () => {
  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: 10,
    });

  await request(app)
    .get(`/api/tickets/${newTicket.body.data.id}`)
    .send()
    .expect(200);
});
