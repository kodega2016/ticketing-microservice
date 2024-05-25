import {
  Listener,
  NotFoundError,
  Subjects,
  TicketUpdatedEvent,
} from "@kodeapps/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: {
      id: string;
      title: string;
      price: number;
      userId: string;
      version: number;
    },
    message: Message,
  ): Promise<void> {
    const { id, title, price, version } = data;
    const ticket = await Ticket.findByEvent({
      version: version,
      id,
    });

    if (!ticket) {
      throw new NotFoundError();
    }

    ticket.set({ title, price });
    await ticket.save();

    message.ack();
  }
}
