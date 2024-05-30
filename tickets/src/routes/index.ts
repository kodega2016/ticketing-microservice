import { Router, Request, Response } from "express";
import { Ticket } from "../models/ticket";
const router = Router();
import { app } from "../app";

app.get("/api/tickets", async (req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });
  res.status(200).send({
    message: "Tickets fetched successfully!",
    data: tickets,
  });
});

export { router as indexTicketRouter };
