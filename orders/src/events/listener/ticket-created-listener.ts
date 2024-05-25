import { Message } from "node-nats-streaming";
import { Listener, TicketCreatedEvent, Subjects } from "@kodeapps/common";
import { queueGroupName } from "../queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: { id: string; title: string; price: number; userId: string },
    message: Message,
  ) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();
    message.ack();
  }
}
