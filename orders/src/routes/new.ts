import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validator,
} from "@kodeapps/common";
import { Router, Request, Response } from "express";
import { createOrderValidator } from "../validators/createOrder";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
const router = Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  "/api/orders",
  requireAuth,
  createOrderValidator,
  validator,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    // make sure that the ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("Ticket is already reserved");
    }

    // calculate the expiration time
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // build the order and save it into the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });

    await order.save();

    //TODO:: publish the event

    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  },
);

export { router as newOrderRouter };
