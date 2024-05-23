import { app } from "./app";
import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (process.env.MONGO_DB_URI === undefined) {
    throw new Error("MONGO_DB_URI must be defined");
  }

  try {
    await natsWrapper.connect(
      "ticketing",
      "kodeapps",
      "http://nats-clusterip-service:4222",
    );
    console.log("connected to NATS");
    const response = await mongoose.connect(
      `mongodb://${process.env.MONGO_DB_URI}:27017/tickets`,
    );
    console.log(
      `Database connection made to:${response.connection.db.databaseName} `,
    );
    app.listen(3000, () => {
      console.log("(tickets) Listening on port 3000");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
