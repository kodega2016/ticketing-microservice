import { Publisher, Subjects, TicketUpdatedEvent } from "@kodeapps/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
