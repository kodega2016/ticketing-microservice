import { Listener } from "../../../common/src/events/base-listener";
import { Message } from "node-nats-streaming";
import { TickerCreatedEvent } from "../../../common/src/events/ticket-created-event";
import { Subjects } from "../../../common/src/events/subjects";

export class TicketCreatedListener extends Listener<TickerCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TickerCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    console.log(data.id);
    console.log(data.title);
    msg.ack();
  }
}
