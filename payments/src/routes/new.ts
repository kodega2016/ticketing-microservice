import {
  NotFoundError,
  requireAuth,
  validator,
  NotAuthorizedError,
  BadRequestError,
  OrderStatus,
} from "@kodeapps/common";
import { Request, Response, Router } from "express";
import { validateCreateCharge } from "../validators/createChargeValidator";
import { Order } from "../models/order";
import { stripe } from "../stripe";
import { Payment } from "../models/payment";
const router = Router();

router.post(
  "/api/payments",
  requireAuth,
  validateCreateCharge,
  validator,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.body.orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Order is already cancelled");
    }

    const charge = await stripe.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: req.body.token,
      description: `Payment for order ${order.id}`,
    });

    const payment = Payment.build({
      orderId: order.id,
      stripeId: charge.id,
    });
    await payment.save();

    res.status(201).send({
      message: "Payment successful",
      data: null,
    });
  }
);

export { router as createChargeRouter };
