import { Publisher, Subjects, OrderCreatedEvent } from "@kodeapps/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
