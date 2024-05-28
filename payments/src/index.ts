import { app } from "./app";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";
import mongoose from "mongoose";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (process.env.MONGO_DB_URI === undefined) {
    throw new Error("MONGO_DB_URI must be defined");
  }
  if (process.env.NATS_CLUSTER_ID === undefined) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  if (process.env.NATS_CLIENT_ID === undefined) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }

  if (process.env.NATS_URL === undefined) {
    throw new Error("NATS_URL must be defined");
  }

  if (process.env.STRIPE_KEY === undefined) {
    throw new Error("STRIPE_KEY must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    console.log("connected to NATS");

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    // listen for interupt signals
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    // setup listeners
    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    const response = await mongoose.connect(
      `mongodb://${process.env.MONGO_DB_URI}:27017/payments`
    );
    console.log(
      `Database connection made to:${response.connection.db.databaseName} `
    );
    app.listen(3000, () => {
      console.log("(payments) Listening on port 3000");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
