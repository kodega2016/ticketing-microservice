import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketCreatedEvent } from "@kodeapps/common";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    console.log(data.id);
    console.log(data.title);
    msg.ack();
  }
}
