import { PaymentCreatedEvent, Publisher, Subjects } from "@kodeapps/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
