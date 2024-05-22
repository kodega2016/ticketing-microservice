import { Publisher, Subjects, TicketCreatedEvent } from "@kodeapps/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
