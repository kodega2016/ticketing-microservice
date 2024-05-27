import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@kodeapps/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: {
      id: string;
      status: OrderStatus;
      expiresAt: string;
      version: number;
      userId: string;
      ticket: { id: string; price: number };
    },
    message: Message
  ): Promise<void> {
    const order = Order.build({
      id: data.id,
      status: data.status,
      version: data.version,
      userId: data.userId,
      price: data.ticket.price,
    });
    await order.save();
    message.ack();
  }
}
