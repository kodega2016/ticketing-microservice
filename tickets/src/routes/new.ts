import { requireAuth, validator } from "@kodeapps/common";
import { Router, Response, Request } from "express";
import { createTicketValidator } from "../validators/createTicket";
import { Ticket } from "../models/ticket";
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
    res.status(201).json({
      messae: "Ticket created",
      data: ticket,
    });
  }
);

export { router as createTicketRouter };
