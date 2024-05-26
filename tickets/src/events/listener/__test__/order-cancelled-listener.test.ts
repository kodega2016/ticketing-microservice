import mongoose from "mongoose";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { OrderCancelledEvent } from "@kodeapps/common";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);
  // create a fake data event
  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "asdf",
  });

  ticket.set({ orderId });
  await ticket.save();
  // create a fake message object
  const msg: any = {
    ack: jest.fn(),
  };
  // call onMessage function with the data object + message object
  const data: OrderCancelledEvent["data"] = {
    id: ticket.id,
    version: ticket.version,
    ticket: {
      id: ticket.id,
    },
  };

  return { listener, ticket, data, msg, orderId };
};

it("updates the ticket, publishes an event, and acks the message", async () => {
  const { listener, ticket, data, msg } = await setup();
  // call onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make sure a ticket was created!
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  // call onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assertions to make sure a ticket was created!
  expect(msg.ack).toHaveBeenCalled();
});
