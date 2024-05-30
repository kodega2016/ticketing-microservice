import {
  Listener,
  PaymentCreatedEvent,
  Subjects,
  OrderStatus,
} from "@kodeapps/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: { id: string; orderId: string; stripeId: string },
    message: Message
  ): Promise<void> {
    const { orderId } = data;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Complete });
    await order.save();

    message.ack();
  }
}
