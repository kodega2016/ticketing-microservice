import { Request, Response, Router } from "express";
import { Order } from "../models/order";
import { requireAuth } from "@kodeapps/common";
const router = Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");

  res.status(200).json({
    message: "Orders fetched successfully",
    data: orders,
  });
});

export { router as indexOrderRouter };
