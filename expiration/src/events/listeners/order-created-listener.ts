import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@kodeapps/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

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
  ) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay: delay,
      }
    );
    message.ack();
  }
}
