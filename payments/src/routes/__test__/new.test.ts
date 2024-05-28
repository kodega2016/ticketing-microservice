import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { OrderStatus } from "@kodeapps/common";
import { Order } from "../../models/order";

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments/new")
    .set("Cookie", global.signin())
    .send({
      orderId: new mongoose.Types.ObjectId().toHexString(),
      token: "token",
    });
});

it("returns a 401 when purchasing an order that does not belong to the user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();
  await request(app)
    .post("/api/payments/new")
    .set("Cookie", global.signin())
    .send({
      orderId: order.id,
      token: "token",
    });
});

it("returns a 400 when purchasing a cancelled order", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();
  await request(app)
    .post("/api/payments/new")
    .set("Cookie", global.signin(userId))
    .send({
      orderId: order.id,
      token: "token",
    });
});

it("returns a 201 with valid inputs", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();
  await request(app)
    .post("/api/payments/new")
    .set("Cookie", global.signin(userId))
    .send({
      orderId: order.id,
      token: "token",
    })
    .expect(201);
});
