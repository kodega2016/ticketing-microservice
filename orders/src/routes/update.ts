import { NotFoundError } from "@kodeapps/common";
import { Router, Response, Request } from "express";
import { Order } from "../models/order";
const router = Router();

router.put("/api/orders/:orderId", async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError();
  }
  res.status(200).json({
    message: "Order updated successfully",
    data: null,
  });
});

export { router as updateOrderRouter };
