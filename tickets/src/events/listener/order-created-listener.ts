import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@kodeapps/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";
import { Ticket } from "../../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: {
      id: string;
      status: OrderStatus;
      expiresAt: string;
      ticket: { id: string; price: number };
    },
    message: Message,
  ) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: data.id });
    await ticket.save();

    message.ack();
  }
}
