import { Listener, ExpirationCompleteEvent, Subjects } from "@kodeapps/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";
import { Order, OrderStatus } from "../../models/order";
import { OrderCancelledPublisher } from "../publisher/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName: string = queueGroupName;

  async onMessage(data: { orderId: string }, message: Message): Promise<void> {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Cancelled, ticket: null });
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    message.ack();
  }
}
