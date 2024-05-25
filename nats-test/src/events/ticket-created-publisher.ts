import { TicketCreatedEvent, Subjects, Publisher } from "@kodeapps/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
