import { idText } from "typescript";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { TicketUpdatedEvent } from "@kodeapps/common";
import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });

  await ticket.save();

  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "new concert",
    price: 999,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  const msg: any = {
    ack: jest.fn(),
  };

  return {
    listener,
    msg,
    data,
    ticket,
  };
};

it("finds, updates, and saves a ticket", async () => {
  const { listener, msg, data, ticket } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.title).toEqual(data.title);
});

it("acks the message", async () => {
  const { listener, msg, data } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

it("does not call ack if the event has a skipped version number", async () => {
  const { listener, msg, data } = await setup();
  data.version = 10;
  try {
    await listener.onMessage(data, msg);
  } catch (err) {}
  expect(msg.ack).not.toHaveBeenCalled();
});
