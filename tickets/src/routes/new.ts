import { requireAuth, validator } from "@kodeapps/common";
import { Router, Response, Request } from "express";
import { createTicketValidator } from "../validators/createTicket";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publisher/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = Router();

router.post(
  "/api/tickets",
  requireAuth,
  createTicketValidator,
  validator,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
    res.status(201).json({
      messae: "Ticket created",
      data: ticket,
    });
  }
);

export { router as createTicketRouter };
