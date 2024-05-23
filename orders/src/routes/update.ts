import { Router, Response, Request } from "express";
const router = Router();

router.put("/api/orders/:orderId", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Order updated successfully",
    data: null,
  });
});

export { router as updateOrderRouter };
