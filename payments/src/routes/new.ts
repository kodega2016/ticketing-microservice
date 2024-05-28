import { NotFoundError, requireAuth, validator } from "@kodeapps/common";
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
    console.log("req.body:", req.body);
    const orders = await Order.find({});
    console.log("orders:", orders);
    const order = await Order.findById(req.body.orderId);
    if (!order) {
      throw new NotFoundError();
    }

    res.status(201).send({
      message: "Payment successful",
      data: null,
    });
  }
);

export { router as createChargeRouter };
