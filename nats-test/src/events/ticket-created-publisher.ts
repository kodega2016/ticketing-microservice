import { TicketCreatedEvent, Subjects, Publisher } from "@kodeapps/common";

export class TicketCreatedPublisher extends Publisher<TickerCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
