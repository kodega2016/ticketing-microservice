import { Router } from "express";
import { Ticket } from "../models/ticket";
import { NotFoundError } from "@kodeapps/common";
const router = Router();

router.get("/api/tickets/:id", async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(200).send({
    message: "Ticket details fetched successfully!",
    data: ticket,
  });
});

export { router as showTicketRouter };
