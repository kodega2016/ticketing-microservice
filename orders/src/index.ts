import { app } from "./app";
import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
import { TicketCreatedListener } from "./events/listener/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listener/ticket-updated-listener";
import { ExpirationCompleteListener } from "./events/listener/expiration-complete-listener";

const start = async () => {
  if (process.env.JWT_KEY === undefined) {
    throw new Error("JWT_KEY must be defined");
  }
  if (process.env.MONGO_DB_URI === undefined) {
    throw new Error("MONGO_DB_URI must be defined");
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }

  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    console.log("Connected to NATS");

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    const response = await mongoose.connect(
      `mongodb://${process.env.MONGO_DB_URI}:27017/orders`
    );
    console.log(
      `Database connection made to:${response.connection.db.databaseName} `
    );
    app.listen(3000, () => {
      console.log("orders service listening on port 3000");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
