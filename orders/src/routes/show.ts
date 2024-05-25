import { Router, Request, Response } from "express";
import { Order } from "../models/order";
import {
  NotFoundError,
  NotAuthorizedError,
  requireAuth,
} from "@kodeapps/common";

const router = Router();

router.get(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate("ticket");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.status(200).json({
      message: "Order fetched successfully",
      data: order,
    });
  },
);

export { router as showOrderRouter };
