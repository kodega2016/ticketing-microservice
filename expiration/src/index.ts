import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (process.env.NATS_CLUSTER_ID === undefined) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  if (process.env.NATS_CLIENT_ID === undefined) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }

  if (process.env.NATS_URL === undefined) {
    throw new Error("NATS_URL must be defined");
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

    // add event listeners
    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
