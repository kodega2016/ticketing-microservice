import { Router, Request, Response } from "express";
const router = Router();
import { Ticket } from "../models/ticket";
import {
  NotFoundError,
  requireAuth,
  validator,
  NotAuthorizedError,
} from "@kodeapps/common";
import { createTicketValidator } from "../validators/createTicket";
import { TicketUpdatedPublisher } from "../events/publisher/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

router.put(
  "/api/tickets/:id",
  requireAuth,
  createTicketValidator,
  validator,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    // check if the ticket owner is the current user
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const { title, price } = req.body;
    ticket.set({
      title,
      price,
    });

    await ticket.save();

    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(200).json({
      message: "Ticket updated successfully",
      data: ticket,
    });
  },
);

export { router as updateRouter };
