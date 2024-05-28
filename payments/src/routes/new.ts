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
const router = Router();

router.post(
  "/api/payments/new",
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

    res.status(201).send({
      message: "Payment successful",
      data: null,
    });
  }
);

export { router as createChargeRouter };
